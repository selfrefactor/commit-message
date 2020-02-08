import * as React from 'react'
import styled from 'styled-components'
import { glue } from 'rambdax'

const Container = styled.div(props => ({
  background: props.background ? props.background : 'inherit',
  display:'grid',
  width: '100vw',
  height: '100vh',
  gridTemplateColumns:'repeat(32, 1fr)',
  gridTemplateRows:'repeat(32, 1fr)',
}))

const subgridStyle = glue(`
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  grid-template-rows: repeat(16, 1fr);
`, '\n')

export const DevContainer = styled(Container)`
  background: #fafafa;
  div{
    outline: 2px solid #433;
  }
`

export const ExampleCell = styled.div`
  background: #aafafa;
  grid-column: 4 / span 3;
`

function zeroBasedOrder(x){
  return x + 1
}

export function Cell({
  children = null,
  evalStyled = null,
  id = undefined,
  subgridFlag = false,
  height,
  topLeft,
  width,
  extraProps = {},
}){
  const subgridRule = subgridFlag ?
    subgridStyle :
    ''
  const evalStyledRule = evalStyled ?
    evalStyled :
    ''

  const attrs = id ? { id } : {}

  const CellContainer = styled.div.attrs(attrs)`
    ${ subgridRule }
    grid-column: ${ zeroBasedOrder(topLeft.x) } / span ${ width };
    grid-row: ${ zeroBasedOrder(topLeft.y) } / span ${ height };
    ${ evalStyledRule }
  `

  return (
    <CellContainer
      { ...extraProps }
    >
      {children}
    </CellContainer>
  )
}

export function Grid({ children, background = '', ...extraProps }){
  return (
    <Container
      background={background}
      { ...extraProps }
    >
      {children}
    </Container>
  )
}
