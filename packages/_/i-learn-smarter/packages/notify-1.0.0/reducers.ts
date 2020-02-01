export interface InitialState {
  className: string
  message: string
}

const initialState: InitialState = {
  className: 'hidden',
  message: '',
}

const reactions = {
  NOTIFY_ANIMATE_CLOSE: (state, action) => ({
    ...state,
    className: `animate-close--${action.notifyType}`,
  }),
  NOTIFY_CLOSE_MESSAGE: (state, action) => ({
    ...state,
    className: 'hidden',
    message: '',
  }),
  NOTIFY_SET_MESSAGE: (state, action) => ({
    ...state,
    className: `active--${action.notifyType}`,
    message: action.message,
  }),
}

interface X extends Array<string>{
  includes(x: any): boolean
}

export const notifyStore = (state = initialState, action) => {
  if ((Object.keys(reactions) as X).includes(action.type)) {
    return reactions[action.type](state, action)
  }

  return state
}
