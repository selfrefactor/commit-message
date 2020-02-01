export type NotifyType = 'notify@SUCCESS' |
  'notify@WARNING' |
  'notify@LOADING' |
  'notify@INFO' |
  'notify@ERROR'

export interface NotifyInput {
  type: NotifyType
  payload: {
    message?: string
    ms?: number,
  }
}
