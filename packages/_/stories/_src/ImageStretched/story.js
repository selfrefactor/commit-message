import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { wrap } from '../../constants'
import { ImageStretched } from './component'
import { gifLarge, imageFirst, imageSecond, imageThird, imageFourth } from '../mocks'

storiesOf('ImageStretched', module)
  .add('large gif', wrap(
    <ImageStretched src={ gifLarge } />
  ))
  .add('1', wrap(
    <ImageStretched src={ imageFirst } />
  ))
  .add('2', wrap(
    <ImageStretched src={ imageSecond } />
  ))
  .add('3', wrap(
    <ImageStretched src={ imageThird } />
  ))
  .add('4', wrap(
    <ImageStretched src={ imageFourth } />
  ))
  .add('with `evalStyled` prop', wrap(
    <ImageStretched
      evalStyled='background:#433;'
      src={ imageFourth }
    />
  ))
