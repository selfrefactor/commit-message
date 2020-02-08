import React from 'react'
import styled from 'styled-components'

const defaultFontSize = 2.6

export function Select({
  fontSize = defaultFontSize,
  onChange,
  list,
  current,
  parentProps = {},
  evalStyled = '',
}){
  const currenOnChange = ({ target }) => onChange(target.value)

  const Container = styled.div`
    padding: 0;
    margin: 0;
    height: 100%;
    width: 100%;
    outline: 2px solid #46c;
    ${ evalStyled }
  `

  const Select = styled.select`
    cursor: pointer;
    transition: font-size 0.27s ease-in;
    font-size: ${ fontSize }vh;
    line-height: ${ fontSize }vh;
    width: 100%;
    height: 100%;
    color: #232;
    padding-left: 2vw;
    overflow: hidden;
    &:hover {
      font-size: ${ fontSize * 1.2 }vh;
    }
  `

  const OptionStyled = styled.option`
    background: #953a;
  `

  const Options = (
    <React.Fragment>
      {list.map((x, i) => (
        <OptionStyled key={`select-sk-${ i }`} value={x}>
          {x}
        </OptionStyled>
      ))}
    </React.Fragment>
  )

  return (
    <Container {...parentProps}>
      <Select value={current} onChange={currenOnChange}>
        {Options}
      </Select>
    </Container>
  )
}
