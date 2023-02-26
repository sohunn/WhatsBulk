import { BulkMessagerConfig } from "./types";

export default class BulkMessenger {
  private readonly options: BulkMessagerConfig = {
    numbers: [],
    message: "",
    selector: "",
    selectorWaitTimeout: 30000,
    interval: 5000
  };

  constructor(options: BulkMessagerConfig) {
    this.options = Object.assign(this.options, options);

    if (this.options.message.length === 0) {
      throw new Error("An empty message cannot be sent");
    }

    if (this.options.selector.length === 0) {
      throw new Error("An empty selector cannot be specified");
    }
  }
}