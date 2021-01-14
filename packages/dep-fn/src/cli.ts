import {update} from './update'

export async function cli(mode = 'updateall'): Promise<void> {
  if(mode === 'updateall'){
    process.env.DEP_FN_UPDATE_ALL = 'true'
  }
  await update()
}
