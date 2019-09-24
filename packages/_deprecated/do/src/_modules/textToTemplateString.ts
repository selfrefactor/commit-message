import { readFileSync } from 'fs-extra'
import * as StringFn from 'string-fn'

// tslint:disable
export function textToTemplateString(templatePath: any, input: any) {
  try {
    const templateContentRaw = readFileSync(templatePath).toString()
    const templateContent = `\`${templateContentRaw}\``
    let result
    const _ = StringFn
    const codeToEvaluate = 'result = eval(templateContent)'
    eval(codeToEvaluate)

    return result
  } catch (e) {
    console.log(e)
    return ''
  }
}
// tslint:enable
