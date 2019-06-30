import { init, last } from 'rambdax'
import { camelCase } from 'string-fn'

export function parseFilePath(filePath: string): ParseFilePath {
  const filePathList = filePath.split('/')
  const folderPath = filePathList.length === 1 ? '' : init(filePathList).join('/')
  const fileName = camelCase(last(filePathList))

  return { folderPath, fileName }
}
