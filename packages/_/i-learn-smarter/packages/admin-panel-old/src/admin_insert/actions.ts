import { createAction } from 'create-action'
import {
  ADMIN_INSERT_CREATE,
  ADMIN_INSERT_LOAD,
  ADMIN_INSERT_LOAD_DATA,
  ADMIN_INSERT_REMOVE,
} from '../constants'

export const nextCurrentIndex = createAction('NEXT_CURRENT_INDEX')
export const closeNotification = createAction('CLOSE_NOTIFICATION')
export const submitRequest = createAction('SUBMIT_REQUEST')
export const loadData = createAction(ADMIN_INSERT_LOAD_DATA)
export const load = createAction(ADMIN_INSERT_LOAD)
export const create = createAction(ADMIN_INSERT_CREATE)
export const remove = createAction(ADMIN_INSERT_REMOVE)
