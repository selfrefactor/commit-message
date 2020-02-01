import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { Loading } from './component'

storiesOf('Loading', module)
  .add('`duration` prop', () =>
    <Loading duration={ 3 } on={ true } />
  )
  .add('`color` prop', () =>
    <Loading color="#45a3f2" on={ true } />
  )
  .add('on', () => <Loading on={ true } />)
  .add('off', () => <Loading on={ false } />)
