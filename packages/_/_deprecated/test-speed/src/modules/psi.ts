import * as psiLib from 'psi'
import { normalizeError } from './normalizeError';

export function psi(url) {
  return new Promise((resolve, reject) => {
    psiLib(url)
      .then(data => {
        const usability = data.ruleGroups.USABILITY.score
        const speed = data.ruleGroups.SPEED.score
        resolve({ speed, usability })
      })
      .catch(err => {
        reject(normalizeError(err))
      })
  })
}
