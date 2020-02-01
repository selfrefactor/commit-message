import styled from 'styled-components'
import { ContainerBase, height } from '../../_styled/grid'

export function getText(fontSize: number) {
  return styled.div`
    padding-top: ${0.3 * height}vh;
    line-height: ${fontSize * height}vh;
    font-size: ${fontSize * height}vh;
    width: 100%;
  `
}

export const Text = styled.div`
  padding-top: ${0.3 * height}vh;
  line-height: ${0.5 * height}vh;
  font-size: ${0.5 * height}vh;
  width: 100%;
`

export const Container = styled(ContainerBase)`
  grid-template-columns: 1fr 23fr 1fr;
  grid-template-rows: 1fr 1fr 1fr 1fr 4fr;
  grid-template-areas: ". ws_input ." 
  ". ws_question ." 
  ". ws_answer ." 
  ". ws_translation ." 
  ". ws_image .";
`
