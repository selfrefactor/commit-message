import React from 'react'
import styled from 'styled-components'
import { defaultTo, glue, uuid } from 'rambdax'

const style = howMany => glue(`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(${ howMany }, 1fr);
  width: 100%;
  height: 100%;
`, '\n')

const Outer = styled.div`
  width: 100%;
  height: 100%;
`

export function Row({
  loopWith = [],
  loopWithComponent,
  parentProps = {},
}){
  const howMany = loopWith.length
  if (!howMany) return null

  const CellContainer = styled.div`
    ${ style(howMany) }
  `
  const LoopWithComponent = defaultTo(styled.div``, loopWithComponent)

  const Looped = loopWith.map((TextOrComponent, i) =>
    (<LoopWithComponent
      key={`${ uuid() }-${ i }`}
    >
      {TextOrComponent}
    </LoopWithComponent>)
  )

  return (
    <Outer>
      <CellContainer { ...parentProps }>
        {Looped}
      </CellContainer>
    </Outer>
  )
}
