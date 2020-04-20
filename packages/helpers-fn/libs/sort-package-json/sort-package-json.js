import { outputJson, readJson } from 'fs-extra'
import { omit } from 'rambdax'

const ORDER = [ 'name', 'scripts', 'git', 'author' ]

export async function sortPackageJson(location, options = {}){
  const { testing } = options
  const unsorted = await readJson(location)
  const other = omit(ORDER, unsorted)

  const sorted = {}

  ORDER.forEach(property => {
    if (unsorted[ property ] === undefined) return

    sorted[ property ] = unsorted[ property ]
  })

  const toSave = {
    ...sorted,
    ...other,
  }
  if (testing)
    return {
      unsortedKeys : Object.keys(unsorted),
      sortedKeys   : Object.keys(toSave),
    }

  await outputJson(
    location, toSave, { spaces : 2 }
  )
}
