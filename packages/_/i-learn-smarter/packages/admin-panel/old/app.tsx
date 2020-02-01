// STYLES
import 'notify/style.css'
import './_helpers/style.css'
import './admin_insert/style.less'
import './admin_repair/style.less'
import './root/style.less'
import './single_insert/style.less'

// IMPORTS
import { ConnectedRouter } from 'connected-react-router'
import { Notify } from 'notify/component'
import * as React from 'react'
import { connect, Provider } from 'react-redux'
import { Route } from 'react-router'
import { Link } from 'react-router-dom'
import { createStore, history } from './root/createStore'

// COMPONENTS
import { AdminInsert } from './admin_insert/component'
import { AdminRepair } from './admin_repair/component'
import { SingleInsert } from './single_insert/component'

// PREPARE
const fn = x => input => ({ [x]: input[x] })

const AdminInsertWrapped = connect(fn('adminInsertStore'))(AdminInsert as any)
const AdminRepairWrapped = connect(fn('adminRepairStore'))(AdminRepair as any)
const SingleInsertWrapped = connect(fn('singleInsertStore'))(SingleInsert as any)

interface RouterComponentProps extends Props {
  store: InitialState
}

const base = 'navigation_panel'
// ROOT
class RouterComponent extends React.Component<RouterComponentProps, {}> {

  constructor(props: RouterComponentProps) {
    super(props)
  }

  public componentDidMount() {
    this.props.dispatch({ type: 'ONCE' })
  }

  public render() {
    return (
      <div>
        <Notify />

        <ConnectedRouter history={history}>
          <div>
            <div className={`${base}__wrapper`}>

              <div className={`${base}__item`}>
                <Link to='/'>Home</Link>
              </div>

              <div className={`${base}__item`}>
                <Link to='/admin-insert'>Insert</Link>
              </div>

              <div className={`${base}__item`}>
                <Link to='/admin-repair'>Repair</Link>
              </div>

              <div className={`${base}__item`}>
                <Link to='/single-insert'>Single Insert</Link>
              </div>

              <div className={`${base}__item`}>
                <a
                  href='#'
                  onClick={() => this.props.dispatch({ type: 'LOGOUT' })}
                >
                  Logout
                </a>
              </div>

            </div>

            <Route
              component={AdminRepairWrapped} exact={true}
              path='/'
            />

            <Route
              component={AdminInsertWrapped} exact={true}
              path='/admin-insert'
            />

            <Route
              component={AdminRepairWrapped} exact={true}
              path='/admin-repair'
            />

            <Route
              component={SingleInsertWrapped} exact={true}
              path='/single-insert'
            />

          </div>
        </ConnectedRouter>
      </div>
    )
  }
}

const RouterComponentWrapped = connect(fn)(RouterComponent as any)

const store = createStore()

export const App = () => (
  <Provider store={store}>
    <RouterComponentWrapped />
  </Provider>
)
