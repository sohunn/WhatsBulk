# WhatsBulk

A simple library to send messages in bulk to multiple users on WhatsApp using just a phone number!

## Installation
```
npm install whatsbulk
```

## Example
```js
const BulkMessenger = require('whatsbulk').default;

const messenger = new BulkMessenger({
  message: "Hello world",
  numbers: ["1234567890", "9873901937", "8660289187"],
  selector: "#main > footer > div._2lSWV._3cjY2.copyable-area > div > span:nth-child(2) > div > div._1VZX7 > div._3Uu1_ > div > div.to2l77zo.gfz4du6o.ag5g9lrv.bze30y65.kao4egtt > p"
});

messenger.on('message', number => {
  console.log(`Successfully sent message to ${number}`);
});

messenger.on('end', results => {
  console.log(`Out of ${results.total} numbers, ${results.successful} message(s) was/were sent and ${results.failed} failed to send`);
});

messenger.on('error', (err, number) => {
  console.log(`Unable to send message to ${number}. Number mostly invalid.`, err);
});

messenger.start();
```

## BulkMessenger Config
```js
{
  /**
   * An array of strings representing phone numbers.
   * Omit any zeroes, brackets, or dashes when adding the phone number in international format.
   */
  numbers: string[]

  /**
   * The message that needs to be sent.
   */
  message: string

  /**
   * The HTML selector which the BulkMessenger needs to wait for, to appear in the DOM before sending the message.
   * Preferably the message box.
   */
  selector: string

  /**
   * Amount of time in milliseconds after which the BulkMessenger considers the selector to be invalid.
   * Defaults to 30 seconds if unspecified
   */
  selectorWaitTimeout: number

  /**
   * Amount of time in milliseconds after which the BulkMessenger proceeds to the next iteration. (next phone number)
   * Defaults to 5 seconds if unspecified
   */
  interval: number
}
```

## Getting the HTML selector
- Login using [WhatsApp](https://web.whatsapp.com).
- Open any chat.
- Open your browser's devtools. If you are unable to do this, please refer to this [MDN Article](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/What_are_browser_developer_tools#how_to_open_the_devtools_in_your_browser) for detailed steps.
- Use inspect element (the icon on the top left corner) and select the textbox that you see from the second step.
- The above step will directly show you the html tag the element is enclosed in. 
- Right click and select copy -> copy selector.


## Example, Getting the HTML selector
![Demonstration of copying the selctor](https://i.imgur.com/WGDZJFZ.gif)

## Other
<a href="https://www.buymeacoffee.com/sohan0884"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=sohan0884&button_colour=FF5F5F&font_colour=ffffff&font_family=Cookie&outline_colour=000000&coffee_colour=FFDD00" /></a>
