import { camelCase } from 'string-fn'

import { component } from '../component/'
import { epic } from '../epic/'
import { testableModule } from '../testable_module/'

const allModes = {
  component,
  epic,
  testableModule,
}

export async function callSpecificMode(
  selectedMode: string,
  rootInput: DoModule,
): Promise<any> {
  const modeKey = selectedMode.endsWith('MODULE') ?
    'testableModule' :
    camelCase(selectedMode)

  return allModes[modeKey](rootInput, selectedMode)
}
