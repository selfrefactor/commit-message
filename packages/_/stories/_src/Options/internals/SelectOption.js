import React from 'react'
import { glue } from 'rambdax'
import { Cell, Grid } from '../../Grid/component.js'
import { Select } from '../../Select/component.js'

export class SelectOption extends React.Component{
  constructor(props){
    super(props)
    this.handleSelect = this.handleSelect.bind(this)
  }

  handleSelect(newValue){
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
      evalStyled: 'outline: solid #d6e5;',
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
                <Select
                  current={singleOption.value}
                  list={singleOption.choices}
                  onChange={this.handleSelect}
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
              <span style={{ fontSize: '70%' }}>{singleOption.value}</span>
            </Cell>
          </Grid>
        </div>
      </Cell>
    )
  }
}
