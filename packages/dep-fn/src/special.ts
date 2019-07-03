import { initPuppeteer, OutputPuppeteer } from 'init-puppeteer'
import { log } from 'helpers'
import { takeLast } from 'rambdax'
import { puppeteerSettings } from './modules/constants'
import { getUpdateTag } from './modules/getUpdateTag'
import { execCommand } from './modules/helpers/execCommand'

export async function special(): Promise<void> {
  try {
    (log as any)('spin')
    const [flag, dependency] = takeLast(2, process.argv)
    const yarnAdd = ['-D', '--dev'].includes(flag) ?
      'yarn add -D' :
      'yarn add'

    var { browser, page }: OutputPuppeteer = await initPuppeteer(puppeteerSettings)

    const url = `https://github.com/selfrefactor/${dependency}`
    const latestTag = await getUpdateTag({
      page,
      url,
    })

    const urlRepo = `${url}#${latestTag}`
    const command = `${yarnAdd} ${urlRepo}`

    log(`Latest tag of '${dependency}' is ${latestTag}`, 'info')
    await execCommand(command)

    log('stopspin')
    log(`'${dependency}' is installed`, 'success')
  } catch (err) {
    console.log(err)
  } finally {
    console.log('closing Chrome')
    if (browser !== undefined && browser.close !== undefined) {
      await browser.close()
    }
  }
}
