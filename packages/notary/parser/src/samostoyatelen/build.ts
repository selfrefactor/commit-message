import { normalizeId } from '../helpers/normalizeId'

export function build(input: BuildSamostoyatelen): string{
  return (
`съгласно Схема № ${input.shema}г. на СлГКК - ${input.locationRegister}: САМОСТОЯТЕЛЕН ОБЕКТ В СГРАДА с идентификатор ${input.id} /${normalizeId(input.id)}/ по кадастралната карта и кадастралните регистри, одобрени със Заповед ${input.zapoved}г. на Изпълнителния директор на АГКК: Адрес на имота: ${input.address}: ${input.text}, посочена в документа площ:	${input.acreage}, прилежащи части: ${input.attachments}, при съседни самостоятелни обекти в сградата: на същия етаж:  ${input.neighboursSameFloor}, под обекта: ${input.neighboursBelowFloor}, над обекта: ${input.neighboursAboveFloor}`    
  )  
}
