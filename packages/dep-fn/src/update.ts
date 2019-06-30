import { initPuppeteer } from 'init-puppeteer'
import { OutputPuppeteer } from 'init-puppeteer/typings'
import { beforeEnd } from './modules/beforeEnd'
import { puppeteerSettings } from './modules/constants'
import { getUpdateDependencies } from './modules/getUpdateDependencies'
import { getDependencies } from './modules/helpers/getDependencies'

export async function update(): Promise<void> {
  try {
    var { browser, page }: OutputPuppeteer = await initPuppeteer(puppeteerSettings)

    const {
      devDependencies,
      dependencies,
      peerDependencies,
      packageJson,
    } = await getDependencies()

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

    await beforeEnd({
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
