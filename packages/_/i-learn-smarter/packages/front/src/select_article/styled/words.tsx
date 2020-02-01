import styled from 'styled-components'
import { frHeight } from './grid'

export const WordsContainer = styled.div`
  grid-area: sa_words;
  height: ${frHeight * 6}vh;
  width: 100%;
  text-align: center;
  span{
    margin: 0 0.4vw;
  }
`
