import {log} from 'helpers-fn'
import {StringMap} from '../../typings'
import {getFallbackUpdate} from './helpers/getFallbackUpdate'
import {isDependencyEligible} from './helpers/isDependencyEligible'

export const getUpdateDependencies = async(
  dependencies: object
): Promise<StringMap<string>> => {
  const willReturn = {}

  for (const prop in dependencies) {
    const dependency = dependencies[prop]
    const eligible = isDependencyEligible(prop)

    if (!eligible) {
      log(`Dependency ${prop} is skipped`, 'warning')
      willReturn[prop] = dependency

      continue
    }

    const willPush: string = await getFallbackUpdate({
      dependency: prop,
      tag: dependency,
    })

    if (willPush !== dependency) {
      log(`Updated '${prop}' dependency to ${willPush}`, 'success')
    } else {
      log(`'${prop}' dependency no need to update`, 'success')
    }

    willReturn[prop] = willPush
  }

  return willReturn
}
