import { uuid, toLower } from 'rambdax'
import { take } from 'redux-saga/effects'
import { ADMIN_INSERT_CREATE, DRAFTS } from './../../constants'
import { dbRequest } from '../../bees/dbRequest'

export function partialMerge(slave, master){
  const holder = {}
  const keys = Object.keys(slave)
  Object.keys(master).forEach(singleKey => {
    if(keys.includes(singleKey)){
      holder[singleKey] = master[singleKey]
    }
  })

  return {
    ...slave,
    ...holder
  }
}

export const baseDocument = {
  enPart: '',
  dePart: '',
  enWord: '',
  deWord: '',
  bgWord: '',
  bgPart: '',
  imageSrc: '',
  imageSrcOrigin: '',
  altTag: '',
  enRelated: [],
  deRelated: [],
  bgRelated: [],
  pcFlag: true,
}

export const getIdentity = () => toLower(uuid(12, true))

async function createDocument(doc){
  const toSave = partialMerge(baseDocument, doc)
  const {ok} = await dbRequest({
    operation: 'create',
    label: DRAFTS, 
    id: getIdentity(),
    data: toSave
  })
  console.log({ok})
}

export function* createDocumentSaga() {
  while (true) {
    try {
      const {payload} = yield take(ADMIN_INSERT_CREATE)
      yield createDocument(payload)
      // notify user
    } catch (err) {
      console.log(err)
    }
  }
}
