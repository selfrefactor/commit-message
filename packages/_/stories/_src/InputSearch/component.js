import * as React from 'react'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faIgloo } from '@fortawesome/free-solid-svg-icons'
library.add(faIgloo)

const inputStyle = { paddingLeft : '11%' }

export class InputSearch extends React.Component{
  constructor(props){
    super(props)
    this.handlePress = this.handlePress.bind(this)
  }

  handlePress(e){
    if (e.key === 'Enter'){
      this.props.onSubmit(e.target.value)
    }
  }

  render(){
    return (
      <div>
        <input
          style={ inputStyle }
          onKeyPress={ this.handlePress }
          placeholder={ this.props.placeholder }
        />

        <FontAwesomeIcon icon="igloo" />
      </div>
    )
  }
}

