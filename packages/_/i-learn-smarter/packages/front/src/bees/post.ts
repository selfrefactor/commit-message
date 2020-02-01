export const postBee: PostRequest = async (url, body) => {
  return (fetch as any)(url, {
    body: JSON.stringify(body),
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
}
