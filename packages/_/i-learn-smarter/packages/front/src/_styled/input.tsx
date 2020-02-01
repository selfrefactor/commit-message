import { DARK_BLUE_5, GREEN_5 } from 'colors'
import styled from 'styled-components'
import { height } from './grid'

export const InputBase = styled.div`
  padding-top: ${0.1 * height}vh;
  
  input {
    caret-color: ${GREEN_5};
    height: ${0.7 * height}vh;
    font-size: ${0.6 * height}vh;
    text-align: center;
    width: auto;
    box-shadow: 3px 3px 1px ${DARK_BLUE_5};
  }
`
