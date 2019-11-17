import { injectTranslatedNumber } from './injectTranslatedNumber'
import { injectTranslatedAcreage } from './injectTranslatedAcreage'
import { injectTranslatedPercentage } from './injectTranslatedPercentage'

export function normalizeAttachments(input: string){
  const withNumber = injectTranslatedNumber(input)
  const withAcreage = injectTranslatedAcreage(withNumber)
  const withPercentage = injectTranslatedPercentage(withAcreage)

  return withPercentage
}