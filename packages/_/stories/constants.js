import React from 'react'
import styled from 'styled-components'

import { Cell, Grid } from './_src/Grid/component'
export const API_URL_LOCAL = 'http://localhost:3010'
export const API_URL_NGROK = 'https://toteff.eu.ngrok.io'

export const API_URL = API_URL_NGROK

export const log = input => alert(JSON.stringify(input, null, 2))

export const imgWide = `img{
  height: auto;
  max-height: 100%;
  max-width: 100%;
}`

export const imgTall = `img{
  max-height: 100%;
  max-width: 100%;
  width: auto;
}`

export const getImageContainer = isWide => styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  ${ isWide ? imgWide : imgTall }
`

export const VideoContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  video {
    height: 100%;
    width: 100%;
  }
`

export function StoryContainer({ children }){
  return (
    <Grid>
      <Cell
        height={28}
        topLeft={{
          x: 2,
          y: 2,
        }}
        width={28}
      >
        {children}
      </Cell>
    </Grid>
  )
}

export function wrap(ReactInstance){
  return () => <StoryContainer>{ReactInstance}</StoryContainer>
}

export function wrapMock(ReactInstance){
  return () => ReactInstance
}
