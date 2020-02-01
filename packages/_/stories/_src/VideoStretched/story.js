import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { wrap } from '../../constants'
import { VideoStretched } from './component'
import { videoFirst, videoSecond } from '../mocks'

storiesOf('VideoStretched', module)
  .add('1', wrap(
    <VideoStretched src={ videoFirst } />
  ))
  .add('2', wrap(
    <VideoStretched src={ videoSecond } />
  ))
