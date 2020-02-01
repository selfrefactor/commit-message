export const getJsonBee: GetRequest = async (url: string) => {
  const result = await (fetch as any)(url, {
    method: 'GET',
  })

  return result.json()
}
