import { waitForNetwork } from 'init-puppeteer'
import { log } from 'log'
import { Response } from 'puppeteer'
import { debug } from 'rambdax'
import { GithubTag } from '../../typings'
import { currentTag } from './dom/currentTag'
import { getURLPackageJson } from './helpers/getURLPackageJson'

export const getInitTag = async (
  input: GithubTag,
): Promise<false | string> => {
  try {
    const { page, url, dependency, tag } = input
    await page.goto(
      url,
      waitForNetwork,
    )
    // Jest related issue
    // Jest NPM package reference the major Github project
    // This project contains all Jest related packages
    // That is why root package.json is `private:true`
    // In this case no conversion is possible

    const urlPackageJson = getURLPackageJson(url)

    const responsePackageJson: Response = await page.goto(
      urlPackageJson,
      waitForNetwork,
    )
    if (responsePackageJson === null || !responsePackageJson.ok) {
      log('responsePackageJson', 'error')

      return false
    }
    const packageJson: { private?: boolean } = await responsePackageJson.json()

    if (packageJson.private) {
      log(`packageJson.private === true | ${dependency}`, 'error')

      return false
    }

    const urlTags = `${url}/tags`

    await page.goto(
      urlTags,
      waitForNetwork,
    )

    const currentTagValue: false | string = await page.evaluate(
      currentTag,
      tag,
    )

    return currentTagValue
  } catch (error) {
    debug(error)
  }
}
