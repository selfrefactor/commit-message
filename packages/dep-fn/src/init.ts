import { initPuppeteer } from 'init-puppeteer'
import {
  InputPuppeteer,
  OutputPuppeteer,
} from 'init-puppeteer'
import { beforeEnd } from './modules/beforeEnd'
import { getInitDependencies } from './modules/getInitDependencies'
import { getDependencies } from './modules/helpers/getDependencies'

export async function init(): Promise<void> {
  try {
    const settings: InputPuppeteer = {
      headless: true,
      url: 'about:blank',
    }

    var { browser, page }: OutputPuppeteer = await initPuppeteer(settings)

    const {
      dependencies,
      devDependencies,
      packageJson,
      peerDependencies,
    } = await getDependencies()

    const betterDependencies = await getInitDependencies({
      dependencies,
      page,
    })

    const betterDevDependencies = await getInitDependencies({
      dependencies: devDependencies,
      page: page,
    })

    const betterPeerDependencies = await getInitDependencies({
      dependencies: peerDependencies,
      page: page,
    })

    await beforeEnd({
      dependencies: betterDependencies,
      devDependencies: betterDevDependencies,
      packageJson,
      peerDependencies: betterPeerDependencies,
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
