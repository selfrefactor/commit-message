// STYLES
import './main/style.less'
import './carrier/style.less'
import './navigation/style.less'
import './root/rxImports'

// COMPONENTS
import { MainWrapped } from './main/component'
import { Notify } from 'notify/component'

// EPICS
import { rootEpic } from './root/epics/'
import { rootReducer } from './root/reducers'

// IMPORTS
import { createEpicMiddleware } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import * as React from 'react'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import { BrowserRouter, Route } from 'react-router-dom'
import { init } from './root/actions'
import { postRequest } from './root/modules/postRequest'

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
const dependencies = {
  getRequest: Observable.ajax,
  postRequest
}

const epicMiddleware = createEpicMiddleware(rootEpic, { dependencies })

// CREATE_STORE
const createdStore = createStore(
  rootReducer,
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
      <BrowserRouter>
        <div>
          <Route component={MainWrapped} exact={true} path='/' />
          {/* ROUTES_MARKER */}
          <Route component={MainWrapped} exact={true} path='/main' />

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

if (module.hot) {
  module.hot.accept('./root/epics/', () => {
    const rootEpicHot = require('./root/epics/').rootEpic
    console.log('HOT_RELOAD')
    epicMiddleware.replaceEpic(rootEpicHot)
  })
}
