import 'rxjs'
import { identity } from 'rambdax'
import { ActionsObservable } from 'redux-observable'

import { initEpic } from './initEpic'

test('', async () => {

  const dependencies = {
    getRequest: identity,
  }

  const initAction: InitAction = { type: 'INIT' }

  const actions$ = ActionsObservable.of(initAction)

  const expectedResult = [
    { type: 'navigation/epics/initEpic' },
  ]

  const actions = await initEpic(actions$, {}, dependencies).toArray().toPromise()

  expect(
    actions,
  ).toEqual(expectedResult)
})
