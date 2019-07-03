import { log } from 'helpers'
import { Response } from 'puppeteer'
import { AddDependency } from '../../typings'
import { latestTag } from './dom/latestTag'
import { getURLPackageJson } from './helpers/getURLPackageJson'

export const getAddDependency = async (
  input: AddDependency,
): Promise<string> => {
  try {
    const urlPackageJson = getURLPackageJson(input.url)

    const responsePackageJson: Response = await input.page.goto(
      urlPackageJson,
    )

    if (responsePackageJson === null || !responsePackageJson.ok) {

      log('responsePackageJson', 'error')

      return input.dependency
    }

    const packageJson: { private?: boolean } = await responsePackageJson.json()

    if (packageJson.private) {

      log('packageJson.private === true', 'error')

      return input.dependency
    }

    const urlTags = `${input.url}/tags`

    await input.page.goto(
      urlTags,
    )

    const latestTagValue = await input.page.evaluate(
      latestTag,
    )

    return latestTagValue === false ?
      input.dependency :
      `${input.url}#${latestTagValue}`
  } catch (err) {
    console.log(err)
    throw err
  }
}
