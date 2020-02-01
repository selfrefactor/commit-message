import * as React from 'react'
import { connect } from 'react-redux'
import { Container } from './_styled/notify'
import { 
  LoadingContainer,
  LoadingBlockFirst,
  LoadingBlockSecond,
  LoadingBlockThird,
} from './_styled/loading'
import { IN, OUT, LOADING_VISIBLE } from './constants'

interface NotifyProps{
  dispatch: any
  notifyStore: any
}

export class NotifyComponent extends React.Component<NotifyProps, {}> {

  public render() {
    const {status} = this.props.notifyStore
    const flag = status === IN || status === OUT

    const loadingFlag = status === LOADING_VISIBLE

    return (
      <div>
        {
          flag &&
          <Container 
            {...this.props.notifyStore}
          >
            <div>
              {this.props.notifyStore.message}
            </div>
          </Container>
        }

        {
          loadingFlag &&
          <LoadingContainer>
            <LoadingBlockFirst {...this.props.notifyStore}/>
            <LoadingBlockSecond {...this.props.notifyStore}/>
            <LoadingBlockThird {...this.props.notifyStore}/>
          </LoadingContainer>
        }
      </div>)
    }
  }

const connectComponent = ({ notifyStore }) => ({ notifyStore })

export const Notify = connect(connectComponent)(NotifyComponent)
