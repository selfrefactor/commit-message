export function normalizeInput(input: string) {
  try {
    // tslint:disable-next-line
    let result
    const codeToEval = `result = ${input}`
    // tslint:disable-next-line
    eval(codeToEval)

    return result
  } catch (e) {
    // when input is string
    return `'${input}'`
  }
}

exports.normalizeInput = normalizeInput
