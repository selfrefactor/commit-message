import {load} from 'package-storage'

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