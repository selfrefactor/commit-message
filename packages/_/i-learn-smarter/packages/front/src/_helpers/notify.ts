import { LONG_DELAY } from '../constants'

export const successLoginNotify = (): NotifyInput => {
  const notifyAction: NotifyInput = {
    payload: {
      message: 'Successfully signed in',
      ms: LONG_DELAY,
    },
    type: 'notify@SUCCESS',
  }

  return notifyAction
}

export const failLoginNotify = (): NotifyInput => {
  const notifyAction: NotifyInput = {
    payload: {
      message: 'No such user or wrong password',
      ms: LONG_DELAY,
    },
    type: 'notify@ERROR',
  }

  return notifyAction
}

export const invalidForm = () => {
  const x: NotifyInput = {
    payload: {
      message: 'Invalid email or password',
      ms: 2000,
    },
    type: 'notify@ERROR',
  }

  return x
}
