import { storiesOf } from '@storybook/react'
import * as React from 'react'
import { Foo } from './component.js'

storiesOf('Foo', module).add('happy', () => (
  <Foo />
))
