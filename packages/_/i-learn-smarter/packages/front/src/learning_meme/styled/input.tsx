import styled from 'styled-components'
import { CenteredItem } from '../../_styled/grid'
import { InputBase } from '../../_styled/input'

export const InputContainer = styled(CenteredItem)`
  grid-area: input;
`

export const Input = styled(InputBase)`
  input{
    width: 70%;
  }
`
