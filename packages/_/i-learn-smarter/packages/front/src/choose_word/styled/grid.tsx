import { DARK_BLUE_3, DARK_2 } from 'colors'
import styled from 'styled-components'
import { ContainerBase } from '../../_styled/grid'

export const cellHeight = 25.7

export const Row = styled.div`
  height: ${cellHeight}vh;
`

const Section = styled.div`
text-align: center;
padding-top: ${cellHeight * 0.12}vh;
line-height: ${cellHeight * 0.7}vh;
font-size: ${cellHeight * 0.17}vh;
height: ${cellHeight}vh;
`

export const Container = styled(ContainerBase)`
  grid-template-columns: 100%;
  grid-template-rows: repeat(3, 1fr);
  grid-template-areas: "cw_question" "cw_solved" "cw_translation";
`

export const Translation = styled(Section)`
color: ${DARK_BLUE_3};
grid-area: cw_translation;
font-weight: bolder;
`

export const Solved = styled(Section)`
color:  ${DARK_2};
grid-area: cw_solved;
`
