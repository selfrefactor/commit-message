import React from 'react'
import { glue } from 'rambdax'
import { Cell, Grid } from '../../Grid/component.js'
import styled from 'styled-components'

const SliderInput = styled.input`
  width: 100%;
  cursor: pointer;
  outline: 1px solid #54a3;
`

export class SliderOption extends React.Component{
  constructor(props){
    super(props)
    this.handleInput = this.handleInput.bind(this)
  }

  handleInput(e){
    const newValue = e.target.value
    this.props.majorCallback({
      ...this.props.expandableProps.singleOption,
      newValue,
      i: this.props.expandableProps.i,
    })
  }

  render(){
    const {
      singleOption,
      canShow,
      containerProps,
    } = this.props.expandableProps
    const background = canShow ? '#25a' : '#4334'

    const cellProps = {
      ...this.props.baseCellProps,

      evalStyled: glue(`
          background: ${ background };
          ${ this.props.baseCellProps.evalStyled }
        `),
    }
    const inputProps = {
      height: 2,
      topLeft: {
        x: 1,
        y: 1,
      },
      width: 14,
    }
    const label = singleOption.visibleLabel ?
      singleOption.visibleLabel :
      singleOption.label

    return (
      <Cell {...containerProps}>
        <div>
          <Grid>
            {canShow && (
              <Cell {...inputProps}>
                <SliderInput
                  autoFocus={true}
                  defaultValue={String(singleOption.value)}
                  max={String(singleOption.between[ 1 ])}
                  min={String(singleOption.between[ 0 ])}
                  type='range'
                  onBlur={this.handleInput}
                />
              </Cell>
            )}
            <Cell
              {...cellProps}
              extraProps={{
                onClick: () =>
                  this.props.turnInputActive(this.props.expandableProps.i),
              }}
            >
              {label}
              {' : '}
              {singleOption.value}
              <span style={{ fontSize: '70%' }}>
                {'(btw '}
                {singleOption.between[ 0 ]}
                {' and '}
                {singleOption.between[ 1 ]}
                {')'}
              </span>
            </Cell>
          </Grid>
        </div>
      </Cell>
    )
  }
}
