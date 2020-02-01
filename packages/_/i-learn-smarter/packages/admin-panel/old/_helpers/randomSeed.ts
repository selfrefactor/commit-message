const LIMIT = 5

export function randomSeed(): string {
  let willReturn = ''
  const data = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'

  for (let i = 0; i < LIMIT; i++) {
    willReturn += data.charAt(Math.floor(Math.random() * data.length))
  }

  return willReturn
}
