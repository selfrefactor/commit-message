import { UpdateTag } from '../../typings'
import { latestTag } from './dom/latestTag'

export const getUpdateTag = async (
  input: UpdateTag,
  ): Promise<false | string> => {
    try {
      const { page, url } = input
    /**
     * Should be Response not any
     * import { Response } from 'puppeteer'
     */
      const responseGithub: any = await page.goto(
      url,
    )

      if (responseGithub._status !== 200) {
      throw new Error(`getGithubTag ${url} ${responseGithub._status}`)
    }
      const urlTags = `${url}/tags`

      await page.goto(
      urlTags,
    )
      const latestTagValue = await page.evaluate(latestTag)

      return latestTagValue
  } catch (err) {
    throw err
  }
}
