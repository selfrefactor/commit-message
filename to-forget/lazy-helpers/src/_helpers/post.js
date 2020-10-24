const headers = new Headers()
headers.append('Accept', 'application/json')
headers.append('Content-Type', 'application/json')

export async function post(input) {
  try {
    return fetch(input.url, {
      body: JSON.stringify(input.body),
      headers: headers,
      method: 'post',
    })
  } catch (err) {
    console.log('post', err)
    throw err
  }
}
