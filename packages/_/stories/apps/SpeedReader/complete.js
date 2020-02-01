import React from 'react'
import { SpeedReader } from './component'

export class SpeedReaderComplete extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <SpeedReader {...this.props} />
    )
  }
}
