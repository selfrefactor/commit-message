// DEV_ONLY
// import './_helpers/socket'
import './root/carrier/style.css'
import './root/rxImports'

// LOCAL_STORAGE
///////////////////////////
import { initLocalState, masterGetter, masterSetter } from 'client-helpers'
import { rootInitBee } from './bees/rootInit'
import { defaultState, initialDefaultState } from './constants'
initLocalState('SK', initialDefaultState)
masterSetter({
  ...initialDefaultState,
  ...defaultState,
  ...masterGetter()
})

// IMPORTS
///////////////////////////
import {
  ConnectedRouter,
  connectRouter,
  routerMiddleware,
} from 'connected-react-router'
import * as React from 'react'
import { render } from 'react-dom'

import * as Sentry from '@sentry/browser'
import { connect, Provider } from 'react-redux'
import { Route } from 'react-router-dom'
import { Observable } from 'rxjs/Observable'

import { createBrowserHistory } from 'history'
import { applyMiddleware, createStore } from 'redux'
import { createEpicMiddleware } from 'redux-observable'

import { createElementAnt } from './ants/createElement'
import { getComposeAnt } from './ants/getCompose'

// COMPONENTS
///////////////////////////
import { Notify } from '../notify/component'
import { ChooseWordWrapped } from './choose_word/component'
import { GuessWordWrapped } from './guess_word/component'
import { LearningMemeWrapped } from './learning_meme/component'
import { LessonWrapped } from './lesson/component'
import { CarrierWrapped } from './root/carrier/component'
import { NavigationWrapped } from './root/navigation/component'
import { SelectArticleWrapped } from './select_article/component'
import { WriteSentenceWrapped } from './write_sentence/component'

// INTERNAL_MODULES
///////////////////////////
import { getJsonBee } from './bees/getJson'

import { postBee } from './bees/post'
import { init } from './root/actions'
import { combinedReducers } from './root/combinedReducers'

const postRequest = (
  url,
  body,
) => Observable.fromPromise(postBee(url, body))

const getJson = url => Observable.fromPromise(
  getJsonBee(url),
)

// EPICS
///////////////////////////
import { rootEpic } from './root/epics/'
const dependencies = {
  getJson: getJson,
  postRequest: postRequest,
}

const epicMiddleware = createEpicMiddleware(rootEpic, { dependencies })

// BOILERPLATE
///////////////////////////
const id = 'react-container'
createElementAnt(id)
const composeEnhancers = getComposeAnt()

// CREATE_STORE
///////////////////////////
const history = createBrowserHistory()
const createdStore = createStore(
  connectRouter(history)(combinedReducers),
  composeEnhancers(
    applyMiddleware(
      routerMiddleware(history),
      epicMiddleware),
  ),
)

// ROOT_COMPONENT
///////////////////////////
class Root extends React.Component<Props, {}> {
  constructor(props: any) {
    super(props)
    rootInitBee()
  }

  public componentDidMount() {
    Sentry.init({
      dsn: 'https://c57bf6cbb9fc431fb3f326f31745f93f@sentry.io/123126',
    })
    this.props.dispatch(init())
  }

  public componentDidCatch(e) {
    Sentry.captureException(e)
  }

  public render() {
    return (
      <div>
        <Notify />
        <CarrierWrapped />
        <ConnectedRouter history={history}>
          <div>
            <NavigationWrapped />

            <Route
              component={LearningMemeWrapped}
              exact={true}
              path='/'
            />

            {/* ROUTES_MARKER */}
            <Route
              component={LessonWrapped}
              path='/lesson-*'
            />
            <Route
              component={SelectArticleWrapped}
              exact={true}
              path='/select-article'
            />

            <Route
              component={GuessWordWrapped}
              exact={true}
              path='/guess-word'
            />

            <Route
              component={LearningMemeWrapped}
              exact={true}
              path='/learning-meme'
            />

            <Route
              component={WriteSentenceWrapped}
              exact={true}
              path='/write-sentence'
            />

            <Route
              component={ChooseWordWrapped}
              exact={true}
              path='/choose-word'
            />
            <Route
              component={WriteSentenceWrapped}
              path='*'
            />
          </div>
        </ConnectedRouter>
      </div>
    )
  }
}

// CONNECT_COMPONENT
const connectRootComponent = ({
  store,
  navigationStore,
}) => ({
  navigationStore,
  store,
})

const RootWrapped = connect(connectRootComponent)(Root)

render(
  <Provider store={createdStore}>
    <RootWrapped />
  </Provider>,
  document.getElementById(id),
)
