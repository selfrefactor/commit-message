import { DARK_BLUE_8, DARK_BLUE_1, GREEN_5, RED_4 } from 'colors'
import styled from 'styled-components'
import { CenteredWithId } from '../../_styled/grid'

const color = `color: ${DARK_BLUE_8};`
const spanColor = `color: ${DARK_BLUE_1};`
const textDecoration = `border-top: solid 1px ${GREEN_5};`
const textDecorationWrong = `border-top: solid 1px ${RED_4};`

export const AnswerContainer = styled(CenteredWithId('ws_answer'))`
  width: 100%;
  grid-area: ws_answer;
`

export const AnswerBase = `
${color}

span:not(:first-child) {
  margin-left: 6px;
}
`

const from = '#DEE5E0'
const to = '#eae3cd'
export const AnswerHidden = styled.span`
  ${spanColor}
  padding-top: 0.05vh;
  background: linear-gradient(to bottom right, ${from}, ${to});  
  border-radius: 5%;
  padding-left: 0.6vw;
  padding-right: 0.6vw;
  visibility: hidden;
`

export const AnswerVisible = styled(AnswerHidden)`
  ${textDecoration}
  visibility: visible;
`

export const AnswerVisibleWrong = styled(AnswerVisible)`
  ${textDecorationWrong}
`
