export function getIndent(str){
  const matched = str.match(/\w|\d/)
  
  if (matched === null) return str.length
  return matched.index
}
