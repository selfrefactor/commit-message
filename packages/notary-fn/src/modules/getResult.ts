import { getAcreage } from './getAcreage'
import { getAddress } from './getAddress'
import { getIdentifikator } from './getIdentifikator'
import { getLocationRegister } from './getLocationRegister'
import { getNeighbours } from './getNeighbours'
import { getOldID } from './getOldID'
import { getPermanentPurpose } from './getPermanentPurpose'
import { getPreviousNumber } from './getPreviousNumber'
import { getPurpose } from './getPurpose'
import { getSkitsa } from './getSkitsa'
import { getZapoved } from './getZapoved'

export function getResult(text: string): Result {
  const acreage = getAcreage(text)
  const address = getAddress(text)
  const identificator = getIdentifikator(text)
  const locationRegister = getLocationRegister(text)
  const neighbours = getNeighbours(text)
  const oldID = getOldID(text)
  const permanentPurpose = getPermanentPurpose(text)
  const previousNumber = getPreviousNumber(text)
  const purpose = getPurpose(text)
  const skitsa = getSkitsa(text)
  const zapoved = getZapoved(text)

  console.log({ oldID, previousNumber, neighbours })
  console.log({ permanentPurpose, purpose, zapoved, address, acreage })
  console.log({ skitsa, locationRegister, identificator })

  return {
    acreage,
    address,
    identificator,
    locationRegister,
    neighbours,
    oldID,
    permanentPurpose,
    previousNumber,
    purpose,
    skitsa,
    zapoved,
  }
}
