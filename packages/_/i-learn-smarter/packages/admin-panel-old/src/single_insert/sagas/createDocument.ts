import { map, pick, trim } from 'rambdax'
import { put, select, take } from 'redux-saga/effects'
import { getDB } from '../../_modules/selectors'

const getAll = state => pick(
  'enWord,deWord,bgWord,dePart,enPart,bgPart',
  state.singleInsertStore,
)

export function* createDocumentSaga() {
  while (true) {
    yield take('singleInsert@CREATE')
    const db = yield select(getDB)

    const propsToSaveRaw = yield select(getAll)
    const propsToSave = map(trim, propsToSaveRaw)
    const docToSave = {
      ...propsToSave,
      imageSrc: false,
      imageSrcOrigin: '',
    }

    const createIs = yield db.post(docToSave)

    console.log(createIs.id, 'create')

    yield put({
      message: createIs.id,
      ms: 1500,
      type: 'NOTIFY_INFO',
    })

    yield put({
      type: 'singleInsert@RESET',
    })
  }
}
