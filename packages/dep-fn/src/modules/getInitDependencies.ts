import { log } from 'helpers'
import { tail } from 'rambdax'
import { GetInfo, InitDependencies, StringMap } from '../../typings'
import { getInitDependency } from './getInitDependency'
import { confirm } from './helpers/confirm'

export const getInitDependencies = async (
  input: InitDependencies,
): Promise<StringMap<string>> => {
  try {
    const dependencies: object = input.dependencies
    const willReturn = {}
    for (const prop in dependencies) {
      const dependency = dependencies[prop]
      const alreadyBetter = dependency.startsWith('https://github.com/')
      const isDefinitelyTyped = prop.startsWith('@types/')

      let conditionRaw: boolean = !(alreadyBetter || isDefinitelyTyped)

      if (alreadyBetter) {
        log(`Dependency is already converted ${prop} ${dependency}`, 'info')
      }

      if (isDefinitelyTyped) {
        log(`Dependency '${dependency}' cannot be converted ${prop}`, 'info')
      }

      const question = `Do you want to convert dependency '${prop}'?`

      const condition = conditionRaw ?
        await confirm(question, dependency) :
        conditionRaw

      const tag: string = Number.isNaN(dependency[0] * 1) ?
        tail(dependency) :
        dependency

      const options: GetInfo = {
        dependency: prop,
        page: input.page,
        tag: tag,
      }

      const willPush: string = condition ?
        await getInitDependency(options) :
        dependency

      willReturn[prop] = willPush
    }

    return willReturn
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
