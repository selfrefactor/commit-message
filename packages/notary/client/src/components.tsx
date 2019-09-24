import * as React  from 'react'
import styled from 'styled-components'

export const Container = styled.div`
  display: grid;
  width: 100vw;
  height: 100vh;
  grid-template-columns: 1fr 6fr 1fr;
  grid-template-rows: 1fr 6fr;
  grid-template-areas: ". upload ." ". notary copybutton"
`

export const Upload = styled.div`
  border: 1px solid pink;
  grid-area: upload;
`

export const Notary = styled.div`
  border: 1px solid pink;
  grid-area: notary;
`

export const CopyButton = styled.div`
  border: 1px solid green;
  grid-area: copybutton;
`
