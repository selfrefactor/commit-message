import { put } from 'redux-saga/effects'

export function* maybeEmit(maybeTrue: boolean, action: Action) {
  if (maybeTrue) { yield put(action) }
}
