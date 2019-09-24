import { resolve } from 'path'
import { outputFileSync } from '../_modules/outputFileSync'
import { stringify } from '../_modules/stringify'
import { textToJs } from '../_modules/textToJs'

export function createReducers(input: ComponentInput) {

  /**
   * Line 17 of askStore.ts
   * using undefined to mark use of root store
   * in this case we can't create reducers file
   */
  if (!input.store) return
  
  const initialState: string = stringify(input.store.initialState)
  const reducersContent = textToJs(
    resolve(__dirname, '../../templates/component/reducers.txt'),
    [initialState, input.storeName, input.storeTyping],
  )

  outputFileSync(
    input.reducersLocation,
    reducersContent,
  )
}
