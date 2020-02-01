import { update } from 'rambdax'

export function okCorrectBee(state: any, payload: any) {

  return {
    ...state,
    okCorrect: update(state.index, payload, state.okCorrect),
  }
}
