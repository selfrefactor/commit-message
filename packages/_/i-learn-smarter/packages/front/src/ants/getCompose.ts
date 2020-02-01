import { compose } from 'redux'

export function getComposeAnt(){
  return process.env.NODE_ENV === 'production' ?
    compose :
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === undefined ?
      compose :
      window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
}
