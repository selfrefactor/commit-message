import React from 'react'
import { glue } from 'rambdax'
import { Cell, Grid } from '../../Grid/component.js'

export function ToggleOption({
  baseCellProps,
  containerProps,
  majorCallback,
  singleOption,
}){
  const handleClick = () => {
    majorCallback({
      type: 'TOGGLE',
      label: singleOption.label,
      newValue: !singleOption.value,
    })
  }
  const background = singleOption.value ? '#11a111' : '#a449'

  const cellProps = {
    ...baseCellProps,
    evalStyled: glue(`
      background: ${ background };
      ${ baseCellProps.evalStyled }
    `),
  }
  const extraProps = { onClick: handleClick }
  const label = singleOption.visibleLabel ?
    singleOption.visibleLabel :
    singleOption.label

  return (
    <Cell {...containerProps}>
      <div>
        <Grid>
          <Cell {...cellProps} extraProps={extraProps}>
            {label}
            {' : '}
            {singleOption.value.toString()}
          </Cell>
        </Grid>
      </div>
    </Cell>
  )
}
