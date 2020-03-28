export function createAction(type){
  return payload => ({type, payload})
}