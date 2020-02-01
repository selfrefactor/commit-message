import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { wrapMock } from '../../constants'
import { Grid, Cell } from '../Grid/component'
import { Select } from './component'

const evalStyled = 'outline: 1px solid green'

storiesOf('Select', module)
  .add('short', wrapMock(
    <Grid>
      <Cell
        evalStyled={ evalStyled }
        height={ 32 }
        subgridFlag={ false }
        topLeft={ {
          x : 0,
          y : 0,
        } }
        width={ 16 }
      >
        <Select
          current='c'
          list={[ 'a', 'b', 'c' ]}
          onChange={console.log}
        />
      </Cell>
    </Grid>
  ))
