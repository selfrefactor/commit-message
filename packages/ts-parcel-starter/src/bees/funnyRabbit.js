import { dispatcher } from 'reduxed'

export function funnyRabbitBee({ state, getState, action, extra }){
  console.log({
    state,
    getState: typeof getState,
    action,
    extra
  })


}
