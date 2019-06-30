// STYLES
import './carrier/style.less'
import './navigation/style.less'
import './root/rxImports'

// COMPONENTS
import { FooWrapped } from './foo/component'
import { SelfrefactorWrapped } from './selfrefactor/component'
import { Notify } from 'notify/component'
import { CarrierWrapped } from './carrier/component'
import { EmptyComponent } from './common'
import { NavigationWrapped } from './navigation/component'
// EPICS
import { rootEpic } from './root/epics/'
import { combinedReducers } from './root/combinedReducers'
// IMPORTS
import { createEpicMiddleware } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import * as React from 'react'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { init } from './root/actions'
import { getJSON as getJSONModule } from './modules/getJSON'
// BOILERPLATE
const id = 'react-container'
const element = document.createElement('div')
element.setAttribute('id', id)
document.body.appendChild(element)

const composeEnhancers = process.env.NODE_ENV === 'production' ?
  compose :
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ === undefined ?
    compose :
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
// EPIC_DEPENDENCIES
const getJSON = url => Observable.fromPromise(getJSONModule(url))
const dependencies = {
  getJSON,
  getRequest: Observable.ajax,
}

const epicMiddleware = createEpicMiddleware(rootEpic, { dependencies })
// CREATE_STORE
const createdStore = createStore(
  combinedReducers,
  composeEnhancers(applyMiddleware(epicMiddleware)),
)
// ROOT_COMPONENT
class Root extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  public componentDidMount() {
    this.props.dispatch(init())
  }

  public render() {
    return <div>
      <Notify />
      <CarrierWrapped />

      <BrowserRouter>
        <div>
          <NavigationWrapped />

          <Route component={EmptyComponent} exact={true} path='/' />
          {/* ROUTES_MARKER */}
          <Route component={FooWrapped} exact={true} path='/foo'/>
          <Route component={SelfrefactorWrapped} exact={true} path='/selfrefactor'/>

        </div>
      </BrowserRouter>
    </div>
  }
}

// CONNECT_COMPONENT
const connectComponent = ({ store, navigationStore }) => ({ store, navigationStore })

const RootWrapped = connect(connectComponent)(Root as any)

render(
  <Provider store={createdStore}>
    <RootWrapped />
  </Provider>,
  document.getElementById(id),
)