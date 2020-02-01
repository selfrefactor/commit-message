const copy = x => (navigator as any).clipboard.writeText(x)

export const logAnt = (input: any) => {
  console.log('LOG_CLIPBOARD', input)
  if (typeof input === 'string') { return copy(input) }

  copy(
    JSON.stringify(
      input,
      null,
      2,
    ),
  )
}
