# Notify
React notification module using React-saga

## How to use

- Install with `yarn add https://github.com/selfrefactor/notify#0.1.0`

- Include style

```
require('notify/style.css')
```

- Include saga and run it in your `createStore.js`

```
import { notifySagas } from 'notify/sagas'

export default function configureStore () {
  const sagaMiddleware = createSagaMiddleware()
  const mainStore = createStore(
    connectRouter(history)(reducers),
    composeEnhancers(applyMiddleware(routerMiddleware(history), sagaMiddleware))
  )

  sagaMiddleware.run(notifySagas)

  return mainStore
}
```

- Add it in your main reducer

```
import { notifyStore } from 'notify/reducers'

export default combineReducers(
  {
    mainStore,
    notifyStore,
  }
)
```

- Import component attach it to your main component

```
import { Notify } from 'notify/component'

class App extends React.Component{
  render(){
    return(<div>
      <Notify />
    </div>)
  }
}
```

- Dispatch `NOTIFY_SUCCESS` action

```
import * as Notify from 'notify'
...
class App extends React.Component{
  componentDidMount () {
    const notifyOptions: Notify.Options = {
      type    : 'NOTIFY_SUCCESS',
      message : 'foo',
      ms: 3000,
    }
    this.props.dispatch(notifyOptions)
  }
}
```

Other action types are:

- `NOTIFY_INFO`

- `NOTIFY_WARNING`

- `NOTIFY_ERROR`
