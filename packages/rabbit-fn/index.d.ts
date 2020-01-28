export interface SendMessage {
  queue: string
  persistant?: boolean
  message: string | object
}

export type Callback = (input: object) => void

export interface ReceiveMessage {
  queue: string
  durable?: boolean
  acknowledge?: boolean
}

export interface RabbitOutput {
  parse: (rawMessage: object) => string
  sendMessage: (sendMessageOptions: SendMessage) => void
  receiveMessage: (receiveMessageOptions: ReceiveMessage) => object
  receiveMessageCallback: (
    receiveMessageOptions: ReceiveMessage,
    callback: Callback
  ) => void
}

export function rabbitFn(rabbitURL?: string): Promise<RabbitOutput>
