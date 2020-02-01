import React from 'react'
import styled from 'styled-components'

const Input = styled.input`
    padding-left: 5px;
    font-size: 3vh;
    line-height: 5vh;
  `

export class InputWithInitial extends React.Component{
  constructor(props){
    super(props)
    this.state = { value: this.props.initialValue }
    this.onChange = this.onChange.bind(this)
    this.onBlur = this.onBlur.bind(this)
  }

  onChange(e){
    this.setState({ value: e.target.value })
  }

  onBlur(){
    this.props.onBlur(this.state.value)
  }

  render(){
    return (
      <Input
        autoFocus={true}
        type='text'
        value={this.state.value}
        onBlur={this.onBlur}
        onChange={this.onChange}
      />
    )
  }
}
