interface FSA<T>{
  type: string
  payload: T
}

export function createActionAnt<T>(type:string){
  // if(arguments.length === 2){
  //   return {
  //     type: type,
  //     payload: arguments[1]
  //   }
  // }  

  return (payload?: T): FSA<T> => ({
    type,
    payload
  })
}
