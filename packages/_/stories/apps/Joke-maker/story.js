import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { Foo } from './component.js'

storiesOf('JokeMaker', module).add('happy', () => (
  <Foo optionsKeyBinding={[ 'alt', 'j' ]} />
))
