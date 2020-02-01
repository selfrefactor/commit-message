import {dbRequest} from '../bees/dbRequest'
export async function loadKeys(label: string){
  const {result} = await dbRequest({
    label,
    operation: 'loadKeys'
  })
  
  return result
}