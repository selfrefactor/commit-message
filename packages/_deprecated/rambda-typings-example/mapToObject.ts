import { 
  mapToObject
 } from 'rambdax'

interface Foo{
  a: string
}

const mapToObjectList = [
  {a: 'foo'},
  {a: 'bar'},
]

const correct = mapToObject<Foo, any>(
  x => {
    // x is infered as Foo as it should
    console.log(x.a)
    return{}
  },
  mapToObjectList
)

// ============================================
const incorrect = mapToObject<Foo, any>(
  mapToObjectPredicate,
  mapToObjectList
)

function mapToObjectPredicate(x){
  // x is any :(
  return {}
}