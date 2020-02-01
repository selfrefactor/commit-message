# Notify

React notification module using React-observable

## Dev info

> yarn start

Start dev process

> Library related files

- ./epic.ts

- ./reducers.ts

- ./component.tsx

- ./constants.ts

- ./styled/notify.tsx

- ./styled/loading.tsx

## How to use

- Install with `yarn add https://github.com/selfrefactor/notify#5.1.0`

- Include epic

```typescript
import { combineEpics } from 'redux-observable'

import { notifyEpic } from 'notify/epic'

export const rootEpic = combineEpics(
  notifyEpic,
)

```

- Add it in your main reducer

```typescript
import { notifyStore } from 'notify/reducers'

const allReducers = {
  notifyStore,
}

export const rootReducer = combineReducers(allReducers))
```

- Import component

```typescript
import { Notify } from 'notify/component'

class App extends React.Component{
  render(){
    return(<div>
      <Notify />
    </div>)
  }
}
```

- Dispatch `notify@SUCCESS` action

```typescript
import { NotifyOptions } from 'notify'

...
class App extends React.Component{
  componentDidMount () {
    const notifyOptions: NotifyOptions = {
      type    : 'notify@SUCCESS',
      payload:{
        message : 'foo',
        ms: 3000,
      }
    }
    this.props.dispatch(notifyOptions)
  }
}
```

Other action types are:

- `notify@INFO`

- `notify@WARNING`

- `notify@ERROR`

- Dispatch `notify@LOADING` action

```typescript
import { NotifyOptions } from 'notify'

...
class App extends React.Component{
  componentDidMount () {
    const notifyOptions: NotifyOptions = {
      type    : 'notify@LOADING',
      payload:{
        ms: 3000,
      }
    }

    const notifyPassingColorOptions: NotifyOptions = {
      type    : 'notify@LOADING',
      payload:{
        ms: 3000,
        message: '#4aaa9a'
      }
    }
    this.props.dispatch(notifyOptions)
    this.props.dispatch(notifyPassingColorOptions)
  }
}

```
