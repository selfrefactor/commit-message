import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { StackOverflowerComplete } from './complete'

storiesOf('StackOverflower', module)
  .add('happy', () =>
    <StackOverflowerComplete optionsKeyBinding={[ 'alt', 's' ]} />
  )
