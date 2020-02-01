export async function fetchData(tag, limit){
  const requestUrl = `https://toteff.eu.ngrok.io/stack-overflow/${ tag }/${ limit }`

  const dataRaw = await window.fetch(requestUrl)
  const data = await dataRaw.json()

  if (data.length === 0){
    console.error('empty data')

    return []
  }

  return data
}
