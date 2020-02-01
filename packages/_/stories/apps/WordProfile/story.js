import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { WordProfileComplete } from './complete'

storiesOf('WordProfile', module).add('happy', () => (
  <WordProfileComplete optionsKeyBinding={[ 'alt', 'w' ]} />
))
