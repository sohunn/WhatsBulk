import { Browser, launch } from 'puppeteer';
import { EventEmitter } from 'events';
import { BulkMessengerConfig } from './types';

export class BulkMessenger extends EventEmitter {
  public readonly options: BulkMessengerConfig;
  protected browser!: Browser;
  private successful = 0;
  private failed = 0;

  constructor(options: BulkMessengerConfig) {
    super();

    if (options.message.length === 0) {
      throw new Error("An empty message cannot be sent");
    }

    if (options.selector.length === 0) {
      throw new Error("An empty selector cannot be specified");
    }

    this.options = options;
  }

  public async start() {
    this.browser = await launch({ headless: false });
    const page = await this.browser.newPage();

    let payloadURL: string;
    for (const number of this.options.numbers) {

      payloadURL = `https://web.whatsapp.com/send/?phone=${number}&text=${encodeURIComponent(this.options.message)}&type=phone_number&app_absent=0`;
      await page.goto(payloadURL);

      try {
        await page.waitForSelector(this.options.selector, { timeout: this.options.selectorWaitTimeout || 30000 });
      } catch (err) {
        this.emit('error', err);
        ++this.failed;
        continue;
      }

      page.keyboard.press('Enter');
      this.emit('message', number);
      ++this.successful;
      await this.wait(this.options.interval || 5000);
    }

    this.browser.close();
    this.emit('end', this.generateResults());
  }

  private wait(ms: number) {
    return new Promise(res => setTimeout(res, ms));
  }

  private generateResults() {
    return {
      total: this.options.numbers.length,
      successful: this.successful,
      failed: this.failed
    };
  }
}