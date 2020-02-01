import React from 'react'
import styled from 'styled-components'

const SliderInput = styled.input`
    width: 100%;
    cursor: pointer;
    outline: 1px solid #54a3;
  `

export class SliderWithBlur extends React.Component{
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
    const {singleOption} = this.props
    return (
       <SliderInput
          max={String(singleOption.between[ 1 ])}
          min={String(singleOption.between[ 0 ])}
          type='range'
          value={String(singleOption.value)}
          onChange={this.onChange}
        />
    )
  }
}
