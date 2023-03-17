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
## How it exactly works?
On the first iteration, you will have to login to WhatsApp web from the browser window that opens up. Follow the steps on the screen to link your phone to WhatsApp web. Subsequent requests do not require you to do this.

WhatsApp web generates random strings for its classes, so there is no universal way to wait for the textbox before sending a message. However, once logged in subsequent requests will use the same class names until logged out. This is why a selector is required to be provided to this library. This also ensures that the page has loaded completely. 

If a number is invalid, do not do anything, the library automatically invalidates the number and moves to the next iteration.

## Motivation
I was in a situation where I had to add about 50 members to a WhatsApp group. Saving 50 numbers from a plain text file to my phone one by one and then addding them sounded like a very huge task and a waste of my ✨ precious time ✨. WhatsApp doesn't provide an API which could do this. As a result, I decided to automate this process by getting somewhat the same functionality, which was to send individual messages and include the invite to the group within the message. That way, it also ensured people who were still interested joined. This was successful where I could get all members joining. I built a private version of this which worked just for those 50 numbers. Eventually, I thought a lot of people would find this really useful and yeah, you're reading this because of that cool thought of mine :D

## BulkMessenger Config
```ts
type BulkMessengerConfig = {
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
   *  The HTML selector which the BulkMessenger needs to wait to appear in the DOM before sending the message.
   */
  selector: string

  /**
   * Amount of time in milliseconds after which the BulkMessenger considers the selector to be invalid.
   * Defaults to 30 seconds.
   */
  selectorWaitTimeout?: number

  /**
   * Amount of time in milliseconds after which the BulkMessenger proceeds to the next iteration.
   * Defaults to 5 seconds.
   */
  interval?: number
}
```
## BulkMessenger Results Object
```ts
type BulkMessengerResults = {
  successful: number
  failed: number
  total: number
} 
```

## BulkMessenger Events
The BulkMessenger emits 3 events. They are:
- `message` - called with the phone number the message was sent to. 
- `error` - called with a TimeoutError and the phone number to which the message failed to send.  
- `end` - called with the [results object](#bulkmessenger-results-object) once the BulkMessenger finishes execution.

## Getting the HTML selector for WhatsApp
- Login using [WhatsApp](https://web.whatsapp.com).
- Open any chat.
- Open your browser's devtools. If you are unable to do this, please refer to this [MDN Article](https://developer.mozilla.org/en-US/docs/Learn/Common_questions/Tools_and_setup/What_are_browser_developer_tools#how_to_open_the_devtools_in_your_browser) for detailed steps.
- Use inspect element (the icon on the top left corner) and select the textbox that you see from the second step.
- The above step will directly show you the html tag the element is enclosed in. 
- Right click and select copy -> copy selector.

## Example, Getting any HTML selector
![Demonstration of copying the selctor](https://i.imgur.com/WGDZJFZ.gif)

## Other
<a href="https://www.buymeacoffee.com/sohan0884"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=&slug=sohan0884&button_colour=FF5F5F&font_colour=ffffff&font_family=Cookie&outline_colour=000000&coffee_colour=FFDD00" /></a>
