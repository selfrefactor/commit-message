import './root/style.css'
import './root/rxImports'

// IMPORTS
import createHistory from 'history/createBrowserHistory'
import * as React from 'react'
import { render } from 'react-dom'
import { connect, Provider } from 'react-redux'
import { Route } from 'react-router'
import { takeArguments } from 'string-fn'
import { replace } from 'rambdax'
import { ConnectedRouter, routerMiddleware } from 'react-router-redux'
import { applyMiddleware, compose, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { getJSON as getJSONModule } from './_modules/getJSON'
import { postRequest } from './_modules/postRequest'
import { init } from './root/actions'
import { combinedReducers } from './root/combinedReducers'

const history = createHistory()
const middleware = routerMiddleware(history)
// COMPONENTS
import { JokeMakerWrapped } from './joke_maker/component'
import { Notify } from 'notify/component'

// EPICS
import { rootEpic } from './root/epics/'

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
  postRequest,
  getRequest: Observable.ajax,
}

const epicMiddleware = createEpicMiddleware(rootEpic, { dependencies })

// CREATE_STORE
const createdStore = createStore(
  combinedReducers,
  composeEnhancers(
    applyMiddleware(middleware),
    applyMiddleware(epicMiddleware),
  ),
)
// ROOT_COMPONENT
class Root extends React.Component<Props, {}> {
  constructor(props: Props) {
    super(props)
  }

  public componentDidMount() {
    const {password} = takeArguments(
      window.location.href
    )
    if(password && !localStorage.getItem('joke.maker')){
      localStorage.setItem('joke.maker', password)
      const newAddress = replace(
        `?password=${password}`,
        '',
        window.location.href
      )
      window.location.replace(newAddress)
    }
    this.props.dispatch(init())
  }

  public render() {
    return (

      <div>
        <Notify />

        <ConnectedRouter history={history}>
          <div>
            {/* ROUTES_MARKER */}
            <Route
              component={JokeMakerWrapped}
              exact={true}
              path='/'
            />

          </div>
        </ConnectedRouter>
      </div>
    )
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
