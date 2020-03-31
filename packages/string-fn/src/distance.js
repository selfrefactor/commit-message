export function distance(a, b){
  if (a.length === 0){ return b.length }
  if (b.length === 0){ return a.length }
  let i, j, prev, tmp, val

  if (a.length > b.length){
    tmp = a
    a = b
    b = tmp
  }

  const row = Array(a.length + 1)

  for (i = 0; i <= a.length; i++){
    row[ i ] = i
  }

  for (i = 1; i <= b.length; i++){
    prev = i
    for (j = 1; j <= a.length; j++){
      if (b[ i - 1 ] === a[ j - 1 ]){
        val = row[ j - 1 ]
      } else {
        val = Math.min(
          row[ j - 1 ] + 1,
          Math.min(
            prev + 1,
            row[ j ] + 1
          )
        )
      }
      row[ j - 1 ] = prev
      prev = val
    }
    row[ a.length ] = prev
  }

  return row[ a.length ]
}
