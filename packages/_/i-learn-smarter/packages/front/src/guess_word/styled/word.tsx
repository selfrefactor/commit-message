import { DARK_BROWN_3 } from 'colors'
import styled from 'styled-components'
import { CenteredItem } from '../../_styled/grid'
import { frHeight, Text } from './grid'

export const WordContainer = styled(CenteredItem)`
  height: ${1 * frHeight}vh;
  grid-area: gw_word;
`

export const Word = styled(Text)`
  color: ${DARK_BROWN_3};
  letter-spacing: 0.4rem;
  word-spacing: 1rem;
`
