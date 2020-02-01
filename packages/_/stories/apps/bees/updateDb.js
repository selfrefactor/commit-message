import { getJsonAnt } from '../ants/getJson'
import { buildUrlAnt } from '../ants/buildUrl'
import { setDbBee } from './setDb'
import { dispatcher } from '../../libs/reduxed/'

export async function updateDbBee(subreddit, marker){
  const { data } = await getJsonAnt(
    buildUrlAnt(subreddit, marker)
  )
  const newDatabase = {
    db     : setDbBee(data.children),
    marker : data.after,
  }
  dispatcher({
    type    : 'SET_DB',
    payload : newDatabase,
  })
}
