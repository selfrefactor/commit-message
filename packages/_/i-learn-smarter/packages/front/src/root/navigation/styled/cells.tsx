import { DARK_BLUE_2, GREEN_2, BACK_8 } from 'colors'
import styled from 'styled-components'

const height = 8

/**
 * Parrent element that each navigation link will use
 */
const Cell = styled.div`
  outline: 1px solid ${GREEN_2};
  text-align: center;
  height: ${height}vh;
  background-color: ${BACK_8};
  color: ${DARK_BLUE_2};

  a {
      text-decoration: none;
      color: inherit;
  }

  a:hover {
      color: inherit;
  }
  &:hover {
      color: ${BACK_8};
      background-color: ${DARK_BLUE_2};
  }
  span {
      display: inline-block;
      vertical-align: middle;
      line-height: ${height}vh;
  }
`

export function CCell(area: string) {

  return styled(Cell)`grid-area: ${area};`
}
