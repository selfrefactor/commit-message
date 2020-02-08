import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { wrap } from '../../constants'
import { InputSearch } from './component'

storiesOf('Input search', module)
  .add('default', wrap(
    <InputSearch
      placeholder='Search'
      onSubmit={ x => console.log(x) }
    />
  ))
