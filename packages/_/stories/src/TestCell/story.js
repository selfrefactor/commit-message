import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { TestCell } from './component'
import { Grid, Cell } from '../Grid/component'
const evalStyled = 'outline: 1px solid green'

storiesOf('Test cell', module)
  .add('happy', () => (<Grid>
    <Cell
      evalStyled={evalStyled}
      height={3}
      topLeft={{
        x: 3,
        y: 3,
      }}
      width={10}
    >
      <TestCell
        fontSize='2.8vh'
        localStorageItem='bar'
        start={100}
      />
    </Cell>
  </Grid>)
  )
