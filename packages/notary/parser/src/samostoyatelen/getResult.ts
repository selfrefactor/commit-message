import { normalizeAcreage } from '../helpers/normalizeAcreage'
import { normalizeAddress } from '../helpers/normalizeAddress'
import { normalizeAttachments } from '../helpers/normalizeAttachments'
import { normalizeText } from '../helpers/normalizeText'
import { titleCase } from '../helpers/titleCase'
import { match, matchTwoSteps } from '../modules/match'
import { build } from './build'

const LABEL = 'samostoyatelen'

export function getResultSamostoyatelen(input: string): string {
  try {
    const matchFn: MatchFn = (label, fn) => match(input, label, fn)
    const matchxFn: MatchFn = (label, fn) => matchTwoSteps(input, label, fn)

    /**
     * Схема
     */
    const shema = matchFn('shema')

    /**
     * Локална служба по картография
     */
    const locationRegister = matchFn('location.register', titleCase)

    /**
     * Идентификатор
     */
    const id = matchFn('identifikator')

    /**
     * Адрес
     */
    const address = matchFn(`address.${LABEL}`, normalizeAddress)

    /**
     * Текст
     */
    const text = matchFn(`text.${LABEL}`, normalizeText)

    /**
     * Площ
     */
    const acreage = matchFn(`acreage.${LABEL}`, normalizeAcreage)

    /**
     * Прилежащи части
     */
    const attachments = matchxFn(`attachments.${LABEL}`, normalizeAttachments)

    /**
     * Съседи
     */
    const neighboursSameFloor = matchFn(`same.floor.${LABEL}`)
    const neighboursBelowFloor = matchFn(`below.floor.${LABEL}`)
    const neighboursAboveFloor = matchFn(`above.floor.${LABEL}`)

    /**
     * Заповед
     */
    const zapoved = matchFn(`zapoved.${LABEL}`)

    const builded = build({
      acreage,
      address,
      attachments,
      id,
      locationRegister,
      neighboursAboveFloor,
      neighboursBelowFloor,
      neighboursSameFloor,
      shema,
      text,
      zapoved,
    })

    return builded
  } catch (e) {
    throw e
  }
}
