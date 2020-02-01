export function canSearchAnt(e){
  return (
    e.key === 'Enter' &&
    e.target.value.trim().length > 3
  )
}
