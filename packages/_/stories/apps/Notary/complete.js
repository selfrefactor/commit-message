import React from 'react'
import { RandomWord } from './component'

export class RandomWordComplete extends React.Component{
  constructor(props){
    super(props)
  }

  render(){
    return (
      <RandomWord {...this.props} />
    )
  }
}
