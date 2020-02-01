import React from 'react'
import {Grid, Cell} from '../../src/Grid/component.js'

const fooStyled = `
  outline: 1px solid #951;
`

export function Foo(){

  
  return (
    <Grid 
      width={32} 
      height={32} 
      topLeft={{x:0, y:0}}
    >
      <Cell evalStyled={fooStyled} width={12} height={8} topLeft={{x:3, y:6}}>
        Foo
      </Cell>
    </Grid>  
  )
}
