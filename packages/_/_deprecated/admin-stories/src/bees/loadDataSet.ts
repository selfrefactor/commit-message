import {dbRequest} from './dbRequest'
export async function loadDataSet(label: string, keys: string[]){
  const {result} = await dbRequest({
    label,
    data: keys,
    operation: 'readSet'
  })
  return result
}