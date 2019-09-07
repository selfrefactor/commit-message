import { 
  reduce
 } from 'rambda'

const correct = reduce<number, number>(
  (acc, elem, i) => {
    return acc + elem +i
  },
  1,
  [1,2,3]
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