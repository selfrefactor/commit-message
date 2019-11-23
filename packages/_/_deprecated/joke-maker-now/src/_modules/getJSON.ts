export async function getJSON<T>(url: string): Promise<T> {
  const result = await (fetch as any)(url, {
    method: 'GET',
  })

  return result.json()
}
