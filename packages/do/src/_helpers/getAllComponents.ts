import {filter, allTrue } from 'rambdax'
import { execCommand } from './execCommand'

const boilerplateFolders = [
  'ants',
  'bees',
  '_styled',
  '_helpers',
  '_modules',
  'carrier',
  'navigation',
]

export async function getAllComponents(srcDirectory: string): Promise<string[]> {
  const [listResult] = await execCommand<string>(
    `ls ${srcDirectory}`, 
    process.cwd(), 
    'DONT_'helpers'
  )
  
  return filter((srcContentInstance: any) => {
    const instanceIsFolder = !srcContentInstance.includes('.')
    const folderIsBoilerplate = boilerplateFolders.includes(srcContentInstance)
    const folderIsInternal = srcContentInstance.startsWith('_')

    return allTrue(
      instanceIsFolder, 
      !folderIsBoilerplate, 
      !folderIsInternal
    )  
  })(listResult.trim().split('\n'))
}
