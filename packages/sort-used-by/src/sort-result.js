import { piped, sort, uniq } from "rambdax";

export function sortResult(input){
  return piped(
    input,
    uniq,
    sort((a, b) => a.stars > b.stars ? -1:1)
  ) 
}