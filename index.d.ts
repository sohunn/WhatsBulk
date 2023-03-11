declare global {

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
}