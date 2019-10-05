import {
  compose,
  head,
  identity,
  length,
  match,
  path,
  replace,
} from 'rambdax'
import { Composed } from '../../typings'
import { execCommand } from './helpers/execCommand'

const urlConditionFn: Composed<string, boolean> = compose(
  x => x === 1,
  length,
  match(/:/g),
)

function getGithubUrl(urlInput: string): string{
  const [a] = match(/github.com.{1,100}/, urlInput)
  const b = replace('.git', '', a)
  const c = replace('github.com:', 'github.com/', b)
  
  return `https://${c}`
}

export const getInitURL = async (
  dependency: string,
): Promise<string> => {
  const command = `npm info --json ${dependency}`
  const packageInfoRaw: string = await execCommand(command)
  try {
    const packageInfo = JSON.parse(packageInfoRaw)

    const url: string | undefined = path('repository.url', packageInfo)

    if (url === undefined) {
      console.log('url === undefined')
      process.exit()
    }
    
    const urlGithub = getGithubUrl(url)

    const startCondition: boolean = urlGithub.startsWith('https://github.com')
    const urlCondition: boolean = urlConditionFn(urlGithub)

    if (!startCondition || !urlCondition) {
      console.log('URL issue', urlGithub, dependency)
      process.exit()
    }

    return urlGithub
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
}
