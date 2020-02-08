import * as React from 'react'
import { VideoContainer } from '../../constants'

export function VideoStretched({ src }){
  return (
    <VideoContainer>
      <video
        autoPlay={ true }
        muted={ true }
        src={ src }
      />
    </VideoContainer>
  )
}

