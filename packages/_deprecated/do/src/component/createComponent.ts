import { resolve } from 'path'
import { switcher } from 'rambdax'
import { camelCase, pascalCase } from 'string-fn'

import { outputFileSync } from '../_modules/outputFileSync'
import { textToJs } from '../_modules/textToJs'

export function createComponent(input: ExtendedComponentInput) {
  const templateFileName = input.firstEpicStarter === 'init' ?
    'componentWithInit.txt' :
    'component.txt'

  const templateFilePath = resolve(
    __dirname,
    `../../templates/component/${templateFileName}`,
  )

  const localStore = camelCase(`${input.name}.store`)
  const className = pascalCase(input.name)

  const props = input.storeType === 'ROOT_STORE' ?
    'Props' :
    pascalCase(`${input.name}.props`)

  /**
   * Define connect store as a string: `fooStore, barStore`
   */
  const connectStores = switcher<string>(input.storeType)
    .is('ROOT_STORE', 'store')
    .is('OWN_STORE', localStore)
    // when BOTH
    .default(`store, ${localStore}`)

  const templateContent = textToJs(
    templateFilePath,
    [className, props, connectStores],
  )

  outputFileSync(
    input.componentLocation,
    templateContent,
  )
}
