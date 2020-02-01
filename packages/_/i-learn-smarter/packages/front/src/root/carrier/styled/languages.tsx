import { BLUE_1, DARK_BLUE_0, GREEN_0, BACK_12 } from 'colors'
import styled from 'styled-components'

const height = 5
const containerHeight = -7.5 * height

/**
 * Hangs onto its parrent to draw a grid used by `Languages`
 */
export const LanguagesContainer = styled.div`
  position: relative;
  top: ${containerHeight}vh;
  z-index: 9999;
  background: ${BACK_12};
  left: 0;
  width: 15vw;

  div.active_language {
    background: ${DARK_BLUE_0};
    color: ${BACK_12};
    :hover{
      color: ${DARK_BLUE_0};
    }
  }
  div.inactive_language:hover {
    color: ${GREEN_0};
  }
`

/**
 * Where every language pair is rendered
 */
export const Languages = styled.div`
  display: grid;
  grid-template-rows: repeat(6, 1fr);
  grid-template-columns: 1fr;
  text-align: center;

  div {
    cursor: pointer;
    color: ${DARK_BLUE_0};
    height: ${height}vh;
    line-height: ${height}vh;
    font-size: ${height * 0.8}vh;
    outline: 1px solid ${BLUE_1};
  }
`
