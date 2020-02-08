import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { imageFirst } from '../mocks'
import { wrap } from '../../constants'
import { ImageLocalStorage, clearStorage } from './component'

// clearStorage()

storiesOf('ImageLocalStorage', module)
  .add('happy', wrap(
    <ImageLocalStorage
      src={ imageFirst }
      uniqKey={ `foo-${ imageFirst }` }
    />
  ))
  .add('pass `isWide`', wrap(
    <ImageLocalStorage
      isWide={ true }
      src={ imageFirst }
      uniqKey={ `foo-${ imageFirst }` }
    />
  ))
