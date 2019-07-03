import { OutputPuppeteer } from 'init-puppeteer'
import { getAddDependency } from './modules/getAddDependency'
import { getInitURL } from './modules/getInitURL'
import { initPuppeteer } from 'init-puppeteer'
import { log } from 'helpers'
import { puppeteerSettings } from './modules/constants'
import { takeLast } from 'rambdax'

export async function add(): Promise<void> {
  try {
    (log as any)('spin')
    const [flag, dependency] = takeLast(2, process.argv)
    const commandStart = ['-D', '--dev'].includes(flag) ?
      'yarn add -D' :
      'yarn add'

    var { browser, page }: OutputPuppeteer = await initPuppeteer(puppeteerSettings)

    const url: string = await getInitURL(dependency)
    const commandEnd: string = await getAddDependency({ 
      page, 
      url, 
      dependency 
    })

    log('stopspin')
    const command = `${commandStart} ${commandEnd}`

    log(`Run \'${command}\' to apply changes`, 'success')
  } catch (err) {
    console.log(err)
  } finally {
    if (browser !== undefined) {
      console.log('closing Chrome')
      await browser.close()
    }
  }
}
