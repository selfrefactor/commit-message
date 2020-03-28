import {log} from 'helpers-fn'
import {InitDependencies, StringMap, UpdateDependencies} from '../../typings'
import {getUpdateDependency} from './getUpdateDependency'
import {getUpdateURL} from './getUpdateURL'
import {getFallbackUpdate} from './helpers/getFallbackUpdate'
import {isDependencyEligible} from './helpers/isDependencyEligible'

export const getUpdateDependencies = async(
  input: InitDependencies
): Promise<StringMap<string>> => {
  try {
    const dependencies: object = input.dependencies
    const willReturn = {}

    for (const prop in dependencies) {
      const dependency = dependencies[prop]
      const alreadyBetter = dependency.startsWith('https://github.com/')
      const isDefinitelyTyped = prop.startsWith('@types/')
      const condition = alreadyBetter && !isDefinitelyTyped
      const eligible = isDependencyEligible(prop)

      if (alreadyBetter && isDefinitelyTyped || !eligible) {
        const typeOK = eligible ? 'already better' : 'skipped'
        log(`Dependency ${prop} is ${typeOK}`, 'warning')
        willReturn[prop] = dependency

        continue
      }

      const options: UpdateDependencies = {
        dependency: prop,
        page: input.page,
        tag: dependency,
        url: getUpdateURL(dependency),
      }

      const willPush: string = condition
        ? await getUpdateDependency(options)
        : await getFallbackUpdate(options)

      if (willPush !== dependency) {
        log(`Updated '${prop}' dependency to ${willPush}`, 'success')
      } else {
        log(`'${prop}' dependency no need to update`, 'success')
      }

      willReturn[prop] = willPush
    }

    return willReturn
  } catch (err) {
    console.log(err)
    process.exit(1)
  }
}
