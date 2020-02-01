import React from 'react'
import { glue } from 'rambdax'
import { Cell, Grid } from '../../Grid/component.js'

export function CallbackOption({
  baseCellProps,
  forceClose,
  containerProps,
  singleOption,
}){
  const handleClick = () => {
    forceClose()
    singleOption.callback()
  }
  const background = '#11a5'

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
          </Cell>
        </Grid>
      </div>
    </Cell>
  )
}
