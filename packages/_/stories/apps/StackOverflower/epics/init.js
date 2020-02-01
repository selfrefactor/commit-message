import { shuffle } from 'rambdax'
import { Observable } from 'rxjs'
import { fetchData } from '../internals/fetchData'
import { batchSizeOption, tagsOption } from '../options'

function init(){
  return new Observable(observer => {
    fetchData(tagsOption.value, batchSizeOption.value).then(response => {
      console.log({ response })
      if (!response.length){
        console.error('no data from `on` server')
        observer.next({
          type    : 'INIT_READY',
          payload : { data : [ {} ] },
        })

        return observer.complete()
      }

      observer.next({
        type    : 'INIT_READY',
        payload : { data : shuffle(response) },
      })
      observer.complete()
    })
  })
}

export const initEpic = action$ =>
  action$.ofType('INIT')
    .pipe(
      init,
    )

