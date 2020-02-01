import 'react-notifications-component/dist/theme.css'
import { wait } from 'rambdax'
import React from 'react'
import { Grid, Cell } from '../../src/Grid/component'
import Uppy from '@uppy/core'
import Tus from '@uppy/tus'
import { DragDrop } from '@uppy/react'
import { postRequest } from './postRequest.js'
import { fooInput } from './foo'
import { notary } from 'notary-fn'
import ReactNotification, { store } from 'react-notifications-component'

const BACKGROUND = '#ede8e1aa'

const evalStyled = `
background: #fa2;
  input.uppy-DragDrop-input{
    display:none
  }
`

const visibleTextStyled = `
background: #fafafa;
outline: 1px solid #433;
textarea{
  background: #cacaca;
  width: 100%;
  height: 100%;
}
`

const copyButtonStyled = `
cursor: pointer;
background: #cad;
text-align: center;
outline: 1px solid #433
`

export class Notary extends React.Component{
  constructor(props){
    super(props)
    // this.state = { visibleText: fooInput }
    this.state = { visibleText: '' }

    this.sendNotification = this.sendNotification.bind(this)
    this.copyToClipboard = this.copyToClipboard.bind(this)
    this.onResult = this.onResult.bind(this)
    this.uppy = Uppy({
      autoProceed: true,
    })
    this.uppy.use(Tus, { endpoint: 'https://master.tus.io/files/' })

    this.uppy.on('file-added', () => {
      this.sendNotification(
        'Processing ...',
        2000,
        'usually it takes 2 seconds'
      )
    })
    this.uppy.on('complete', result => {
      const url = result.successful[ 0 ].uploadURL
      this.onResult(url)
    })
  }

  sendNotification(text, duration = 1200, message = '✎'){
    store.addNotification({
      title: text,
      message,
      type: 'info',
      insert: 'top',
      container: 'top-right',
      animationIn: [ 'animated', 'fadeIn' ],
      animationOut: [ 'animated', 'fadeOut' ],
      dismiss: {
        duration,
        onScreen: false,
      },
    })
  }

  copyToClipboard(){
    const copyText = document.querySelector('textarea')
    copyText.select()
    document.execCommand('copy')
    this.sendNotification('Copied to clipboard', 900)
  }

  async onResult(url){
    const notaryInputText = await postRequest(url)
    const [ result, err ] = await wait(notary(notaryInputText))
    
    if (err){
      const errMessage = `Error with message '${err}'`
      this.sendNotification('Error', 5000, errMessage)
      return this.setState({ visibleText: errMessage })
    }

    this.setState({ visibleText: result })
  }

  render(){
    const { visibleText } = this.state
    return (
      <Grid background={BACKGROUND}>
        <Cell
          evalStyled={evalStyled}
          height={3}
          topLeft={{
            x: 1,
            y: 1,
          }}
          width={30}
        >
          <DragDrop
            height='100%'
            locale={{}}
            note={null}
            target={null}
            uppy={this.uppy}
            width='100%'
          />
        </Cell>
        <Cell
          evalStyled={copyButtonStyled}
          height={1}
          topLeft={{
            x: 1,
            y: 6,
          }}
          width={30}
        >
          <div onClick={this.copyToClipboard}>Copy to clipboard</div>
        </Cell>
        <Cell
          evalStyled={visibleTextStyled}
          height={23}
          topLeft={{
            x: 1,
            y: 8,
          }}
          width={30}
        >
          <textarea readOnly={true} value={visibleText} />
        </Cell>
        <ReactNotification /> 
      </Grid>
    )
  }
}