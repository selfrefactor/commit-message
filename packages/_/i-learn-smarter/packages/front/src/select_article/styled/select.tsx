import {
  BACK_2,
  BACK_5,
  BLUE_3,
  BLUE_5,
  DARK_RED_2,
  GREEN_2,
  NAVY_3,
} from 'colors'
import styled from 'styled-components'
import { frHeight } from './grid'

/**
 * Because row `sa_word` is 10fr
 */
const height = frHeight * 10

/**
 * 7 instead of 6 because of margin
 */
const cellHeight = height / 7

export const SelectContainer = styled.ul`
  display:inline-block;
  height: ${height}vh;
  list-style-type: none;
  margin: 0 10px;
  min-width: 7vw;
  li.selectable_correct{
    color: ${BACK_5};
    background: ${GREEN_2};
  }
  li.selectable_wrong{
    color: ${BACK_5};
    background: ${DARK_RED_2};    
  }
  li.selectable_inactive{
    color: ${BACK_5};
    background: ${BLUE_5};    
  }
`

export const Select = styled.li`
  background: ${BACK_2};
  cursor: pointer;
  height: ${cellHeight}vh;
  line-height: ${cellHeight}vh;
  font-size: ${cellHeight / 2}vh;
  margin-top: ${frHeight * 0.07}vh;
  outline: double ${BLUE_3};
  text-align: center;
  transition: background 0.12s ease-in;

  &:hover{
    background: ${NAVY_3};
  }
`
