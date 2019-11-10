import * as React from 'react'
import { connect } from 'react-redux'
import * as UppyCore from 'uppy/lib/core'
import * as Tus from 'uppy/lib/plugins/Tus'
import { DragDrop } from 'uppy/lib/react'
import { uploadReady } from './actions'
import { Container, Upload, Notary, CopyButton } from '../components'
import { MAIN_INIT } from '../constants'
import { copy } from '../root/modules/copy'

const uppyOptions = { 
  endpoint: 'https://master.tus.io/files/'
}
interface Uppy{
  use: Function
  run: Function
  on: Function
  reset: Function
}

export class Main extends React.Component<MainProps, {}> {
  public uppy: Uppy
  
  constructor(props: MainProps) {
    super(props)
    this.clickCopyButton = this.clickCopyButton.bind(this)
    this.uppy = UppyCore({
      meta: { type: 'pdf' },
      restrictions: { 
        allowedFileTypes: ['*.pdf'],
        maxNumberOfFiles: 1
      },
      autoProceed: true
    })
  }
  public clickCopyButton(){
    copy(this.props.mainStore.notary)
  }
  public componentDidMount(){
    this.props.dispatch({type: MAIN_INIT})
    this.uppy.use(Tus, uppyOptions)
    this.uppy.run()
    
    this.uppy.on('complete', (result) => {
      this.props.dispatch(uploadReady(result))
      this.uppy.reset()
    })
  }
  public render() {
    return <Container>
        <Upload>
        <DragDrop
          uppy={this.uppy}
        />
        </Upload>
        <Notary>
          {this.props.mainStore.notary}
        </Notary>
        <CopyButton>
          <button 
            type='button'
            onClick={this.clickCopyButton} 
          >
            To Clipboard
          </button>
        </CopyButton>
      </Container>
  }
}

const connectComponent = ({ mainStore }) => ({ mainStore })

export const MainWrapped = connect(connectComponent)(Main)
