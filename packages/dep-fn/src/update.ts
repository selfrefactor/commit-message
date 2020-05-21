import {initPlaywright} from 'init-playwright'
import {beforeEnd} from './modules/beforeEnd'
import {playwrightSettings} from './modules/constants'
import {getUpdateDependencies} from './modules/getUpdateDependencies'
import {getDependencies} from './modules/helpers/getDependencies'

export async function update(): Promise<void> {
  try {
    var {browser, page} = await initPlaywright(playwrightSettings)

    const {
      devDependencies,
      dependencies,
      peerDependencies,
      packageJson,
    } = getDependencies()

    const updatedDependencies = await getUpdateDependencies({
      dependencies,
      page,
    })

    const updatedDevDependencies = await getUpdateDependencies({
      dependencies: devDependencies,
      page: page,
    })

    const updatedPeerDependencies = await getUpdateDependencies({
      dependencies: peerDependencies,
      page: page,
    })

    beforeEnd({
      dependencies: updatedDependencies,
      devDependencies: updatedDevDependencies,
      packageJson: packageJson,
      peerDependencies: updatedPeerDependencies,
    })
  } catch (err) {
    console.log(err)
  } finally {
    console.log('closing Chrome')
    if (browser !== undefined) {
      await browser.close()
    }
  }
}
