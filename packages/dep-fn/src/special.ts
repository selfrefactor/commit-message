import {log} from 'helpers-fn'
import {initPlaywright, OutputPlaywright} from 'init-playwright'
import {playwrightSettings} from './modules/constants'
import {getUpdateTag} from './modules/getUpdateTag'
import {execCommand} from './modules/helpers/execCommand'

export async function special(
  flagOrDependency: string,
  maybeDependency?: string
): Promise<void> {
  try {
    (log as any)('spin')
    const isDevDependency = ['-D', '--dev'].includes(flagOrDependency)
    const dependency = maybeDependency ? maybeDependency : flagOrDependency

    const yarnAdd = isDevDependency ? 'yarn add -D' : 'yarn add'

    var {browser, page}: OutputPlaywright = await initPlaywright(
      playwrightSettings
    )

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
    if (browser.close !== undefined) {
      await browser.close()
    }
  }
}
