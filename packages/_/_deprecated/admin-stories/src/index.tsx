// STYLES
// import './_helpers/style.css'
import './style.css'
import './admin_insert/style.css'
// import './admin_repair/style.less'
// import './root/style.less'
// import './single_insert/style.less'

// IMPORTS
import * as React from 'react'
import { connect, Provider } from 'react-redux'
import { createStore } from './root/createStore'

// COMPONENTS
import { AdminInsert } from './admin_insert/component'

interface RouterComponentProps {
  store: InitialState,
  adminInsertStore: AdminInsertStore,
  dispatch: (typePayload: Object) => void
}

// ROOT
class Root extends React.Component<RouterComponentProps, {}> {

  constructor(props: RouterComponentProps) {
    super(props)
  }

  public componentDidMount() {
    this.props.dispatch({ type: 'ONCE' })
  }

  public render() {
    return (
      <div>
        <AdminInsert {...this.props}/>
      </div>
    )
  }
}

const createdStore = createStore()

// CONNECT_COMPONENT
const connectRootComponent = ({
  store,
  adminInsertStore
}) => ({
  adminInsertStore,
  store,
})

const RootWrapped = connect(connectRootComponent)(Root)

export const Foo = () => <Provider store={createdStore}>
<RootWrapped />
</Provider>
