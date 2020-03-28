import {UpdateTag} from '../../typings'
import {latestTag} from './dom/latestTag'

export const getUpdateTag = async(
  input: UpdateTag
): Promise<false | string> => {
  const {page, url} = input
  const responseGithub: any = await page.goto(url)

  if (responseGithub._status !== 200) {
    throw new Error(`getGithubTag ${url} ${responseGithub._status}`)
  }
  const urlTags = `${url}/tags`

  await page.goto(urlTags)
  const latestTagValue = await page.evaluate(latestTag)

  return latestTagValue
}
