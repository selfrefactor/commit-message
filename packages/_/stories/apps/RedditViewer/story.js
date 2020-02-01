import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { RedditViewer } from './component'

storiesOf('RedditViewer', module)
  .add('happy', () =>
    <RedditViewer />
  )
