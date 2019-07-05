// declare module '*.scss' {
//   const content: any;
//   export default content;
// }

interface Action<T>{
  type:String
  payload: T
}

interface FooStore{
  counter:number
}
interface BarStore{}

interface RootState {
  fooStore : FooStore
  barStore : BarStore
  sk       : boolean
  a        : number
}