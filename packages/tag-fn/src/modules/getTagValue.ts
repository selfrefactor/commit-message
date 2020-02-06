import { equals, findIndex } from 'rambdax'
import { IGetTagValue } from '../custom'
import { getCurrentTag } from './getCurrentTag'
import { getNextTag } from './getNextTag'

export const tagTypes: Array<TagType> = [
  'major',
  'minor',
  'patch',
]

export const getTagValue = async (x: IGetTagValue): Promise<string> => {
  const index: number = findIndex(equals(x.tag), tagTypes)

  if (index === -1) {
    return x.tag
  }

  const tagType: TagType = index === -1 ?
    'patch' :
    tagTypes[index]

  const currentTag: string = await x.page.evaluate(getCurrentTag)

  return getNextTag(currentTag, tagType)
}
