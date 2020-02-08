import { glue } from 'rambdax'
import React from 'react'

import { Cell, ExampleCell, Grid } from './component'

export default { title: 'Grid' }

export const simple = () => (
  <Grid>
    <Cell
      height={8}
      topLeft={{
        x: 4,
        y: 11,
      }}
      width={3}
    >
      foo
    </Cell>
  </Grid>
)

export const withSubgridFlag = () => (
  <Grid>
    <Cell
      height={8}
      subgridFlag={true}
      topLeft={{
        x: 4,
        y: 11,
      }}
      width={15}
    >
      <Cell
        evalStyled={glue(`
              background:#433;
            `)}
        height={3}
        topLeft={{
          x: 2,
          y: 8,
        }}
        width={7}
      />
    </Cell>
  </Grid>
)

export const withExampleCell = () => (
  <Grid>
    <ExampleCell />
  </Grid>
)
