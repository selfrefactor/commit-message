export type OptionsType = 'NOTIFY_INFO' |
  'NOTIFY_WARNING' |
  'NOTIFY_ERROR' |
  'NOTIFY_SUCCESS'

export interface Options {
  type: OptionsType
  message: string
  ms?: number
}
