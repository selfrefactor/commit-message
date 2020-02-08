import * as React from 'react'
import styled from 'styled-components'
import { uuid } from 'rambdax'
import { Loading } from '../Loading/component'

const WIDE = 'WIDE'
const TALL = 'TALL'

const imgWide = `img{
    max-width: 100%;
    max-height: 100%;
    height: auto;
}`
const imgTall = `img{
  width: auto;
     max-width: 100%;
    max-height: 100%;
}`

export class ImageStretched extends React.Component{
  constructor(props){
    super(props)
    this.uuid = uuid()
    this.state = { mode : undefined }
  }

  componentDidMount(){
    const self = this
    const img = new Image()
    img.onload = function(){
      const mode = this.width > this.height ?
        WIDE :
        TALL
      self.setState({ mode }, () => {
        document.getElementById(self.uuid).appendChild(img)
        if (self.props.callback) self.props.callback()
      })
    }
    img.src = this.props.src
  }

  render(){
    if (!this.state.mode) return <Loading on={ true } />

    const {
      evalStyled,
      src,
      ...extraProps
    } = this.props
    const evalStyledRule = evalStyled ?
      evalStyled :
      ''

    const img = this.state.mode === WIDE ?
      imgWide :
      imgTall

    const ImageContainer = styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      ${ evalStyledRule }
      ${ img }
    `

    return (
      <ImageContainer
        id={ this.uuid }
        { ...extraProps }
      />
    )
  }
}

