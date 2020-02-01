import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { ObservableStarterComplete } from './complete'

storiesOf('ObservableStarter', module)
  .add('happy', () =>
    <ObservableStarterComplete />
  )
