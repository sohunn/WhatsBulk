export type BulkMessengerConfig = {
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
   * The selector which the BulkMessenger needs to wait for before sending the message.
   */
  selector: string

  /**
   * Amount of time in milliseconds after which the BulkMessenger considers the selector to be invalid.
   * Defaults to 30 seconds.
   */
  selectorWaitTimeout?: number

  /**
   * Amount of time in milliseconds after which the BulkMessenger proceeds to the next iteration.
   * Defaults to 5 seconds
   */
  interval?: number
}

interface BulkMessengerEvents {
  error: [message: string, error: Error],
  message: [phoneNumber: string],
  end: [status: { total: number, failed: number, successful: number }]
}

declare module 'node:events' {
  class EventEmitter {
    on<K extends keyof BulkMessengerEvents>(event: K, listener: (...args: BulkMessengerEvents[K]) => void): this
    once<K extends keyof BulkMessengerEvents>(event: K, listener: (...args: BulkMessengerEvents[K]) => void): this
    off<K extends keyof BulkMessengerEvents>(event: K, listener: (...args: BulkMessengerEvents[K]) => void): this
  }
}