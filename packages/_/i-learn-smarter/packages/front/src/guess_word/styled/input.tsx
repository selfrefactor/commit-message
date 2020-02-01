import styled from 'styled-components'
import { CenteredItem } from '../../_styled/grid'
import { InputBase } from '../../_styled/input'
import { frHeight } from './grid'

export const InputContainer = styled(CenteredItem)`
  height: ${1 * frHeight}vh;
  grid-area: gw_input;
`

export const Input = styled(InputBase)`
  input{
    width: 70%;
  }
`
