import * as React from 'react'
import styled, { keyframes } from 'styled-components'
import { defaultTo } from 'rambdax'

const FixedContainer = styled.div`
  position: fixed;
  top: 40%;
  left: 35%;
  width: 30%;
  height: 20%;
  z-index:9999;
`

const LoaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
`

const animation = keyframes`
  0% {
    border-radius: 20%;
  }
  100% {
    border-radius: 50%;
  }
`

export function Loading({ on, color, duration }){
  if (!on) return null
  const backgroundProp = defaultTo(
    '#faa',
    color
  )
  const durationProp = `${ defaultTo(0.8, duration) }s`

  const LoaderDiv = styled.div`
    padding: 40%;
    background: ${ backgroundProp };
    animation: ${ animation } ${ durationProp } ease-in-out infinite alternate;
  `

  return (
    <FixedContainer>
      <LoaderContainer>
        <LoaderDiv />
      </LoaderContainer>
    </FixedContainer>
  )
}

