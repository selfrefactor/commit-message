import {load} from '../../../../package-storage/index.js'

export function isDependencyEligible(dependency: string): boolean{
  const loaded = load(
    'depFn',
    undefined,
    true,
    )

  return Array.isArray(loaded) ?
    !loaded.includes(dependency) :
    true
}
