import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { OptionsComplete } from './complete'

storiesOf('Options', module).add('happy', () => (
  <OptionsComplete keyBinding={[ 'alt', 'y' ]} />
))
