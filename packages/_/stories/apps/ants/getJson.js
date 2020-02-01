export async function getJsonAnt(url){
  const result = await fetch(url, { method : 'GET' })

  return result.json()
}
