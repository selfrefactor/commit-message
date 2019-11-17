import { replace } from 'rambdax'
import { convertNumbers } from '../helpers/convertNumbers'
import { getNumberOfStreet } from '../helpers/getNumberOfStreet'
import { translateNumber } from '../helpers/translateNumber'

export function getText(input: Result): string {
  const rawText = `
Съгласно скица № ${input.skitsa} на СлГКК ${input.locationRegister} -
ПОЗЕМЛЕН ИМОТ с идентификатор ${input.identificator}/${convertNumbers(input.identificator)}/
по кадастралната карта и кадастрални регистри,
одобрени със Заповед № ${input.zapoved} на ИД на АГКК,
адрес на имота ${input.address}/${translateNumber(getNumberOfStreet(input.address))}/,
с площ от ${input.acreage},
с трайно предназначение на територията - ${input.purpose}
и начин на трайно ползване – ${input.permanentPurpose},
стар идентификатор – ${input.oldID},
номер по предходен план - ${input.previousNumber},
при съседи: ${input.neighbours}
`
  const replaced = replace(
    /\n/gm,
    ' ',
    rawText,
  )

  return replaced.trim()
}
