import { FOO_INCREMENT, BAR_INCREMENT, FOO_ROUTE_CHANGE, BAR_ROUTE_CHANGE } from './constants'
import { createAction } from 'create-action'

export const fooRouteChange = createAction(FOO_ROUTE_CHANGE)
export const barRouteChange = createAction(BAR_ROUTE_CHANGE)
export const fooInc = createAction(FOO_INCREMENT)
export const barInc = createAction(BAR_INCREMENT)
