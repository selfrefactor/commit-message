import { put, select, take } from 'redux-saga/effects'
import { notify, notifyLoading } from '../../_helpers/notify'
import { getRelated } from '../../_modules/getRelated'
import { getCurrentInstance } from '../../_modules/selectors'
import { initialRelated } from '../../admin_repair/reducers'
import { RELATED_INIT, RELATED_READY } from '../../constants'

function getNewRelated(result: string[][], languages: string[]): any {
  return languages.reduce((prev, x, i) => {
    return {
      ...prev,
      [x]: result[i],
    }
  }, {})
}

export function* relatedInitSaga() {
  while (true) {
    try {
      yield take(RELATED_INIT)

      const currentInstance = yield select(getCurrentInstance)

      const languagesWithoutRelated = ['de', 'en', 'bg'].filter(
        x => {
          const ok = currentInstance[`${x}Related`] === undefined
          const exists = currentInstance[`${x}Word`] !== undefined

          return ok && exists
        },
      )

      if (languagesWithoutRelated.length === 0) {
        continue
      }

      yield notifyLoading()

      const promised = languagesWithoutRelated.map(
        async x => getRelated(currentInstance, x),
      )

      const result = yield Promise.all(promised)

      yield notify('Related results are ready')

      yield put({
        payload: {
          ...initialRelated,
          ...getNewRelated(result, languagesWithoutRelated),
        },
        type: RELATED_READY,
      })
    } catch (e) {
      console.log(e)
    }
  }
}
