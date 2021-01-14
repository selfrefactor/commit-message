import {beforeEnd} from './modules/beforeEnd'
import {getUpdateDependencies} from './modules/getUpdateDependencies'
import {getDependencies} from './modules/helpers/getDependencies'

export async function update(): Promise<void> {
  const {
    devDependencies,
    dependencies,
    peerDependencies,
    packageJson,
  } = getDependencies()

  const updatedDependencies = await getUpdateDependencies(dependencies)

  const updatedDevDependencies = await getUpdateDependencies(devDependencies)

  const updatedPeerDependencies = await getUpdateDependencies(peerDependencies)

  beforeEnd({
    dependencies: updatedDependencies,
    devDependencies: updatedDevDependencies,
    packageJson: packageJson,
    peerDependencies: updatedPeerDependencies,
  })
}
