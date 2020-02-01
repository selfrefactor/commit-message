import { findIndex, replace } from 'rambdax'
import { putAheadAnt } from '../ants/putAhead';

function putAheadId(dbValue: any[], initAction: any){
  if (!initAction) { return dbValue }
  const altTag = replace(/-|%20/g, ' ' , initAction.payload)

  const index = findIndex(
    dbInstance => (dbInstance).altTag === altTag,
    dbValue,
  )

  return putAheadAnt(dbValue, index)
}

export function instanceDatabase(
    dbValue: any[],
    initAction?: any,
  ){
  if (!initAction) return dbValue

  return putAheadId(dbValue, initAction)
}
