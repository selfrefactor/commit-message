import { bluegrey5, navy4 } from 'colors'

import styled from 'styled-components'

const height = 88
const numberFractions = 10

export const Grid = styled.div`
  display: grid;
`

function getFraction(
  fraction: number,
): number {

  return (height / numberFractions) * fraction
}

const fr = getFraction(1)

function getSubFraction(
  firstFraction: number,
  secondFraction: number,
): number {

  return getFraction(firstFraction) / secondFraction
}

export const Container = styled.div`
  display: grid;  
  height: ${height}vh;
  width: 94vw;
  margin-right: 3vw;
  margin-left: 3vw;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: 1fr 7fr 1fr 1fr;
  grid-gap:2.5%;
  grid-template-areas: "top_left top_up top_right" 
  "middle_left middle_up middle_right"
  "bottom_area bottom_area bottom_area"
  "nav_next nav_mode .";
  
  button{
    cursor: pointer;    
  }
`

const DynamicContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: repeat(6, 1fr);
  min-height: ${7 * fr}vh;
  outline: solid ${bluegrey5};  
`

const cellFraction = getSubFraction(7, 6)

const CellBase = styled.div`
  height: ${cellFraction}vh;
  text-align: center;
  cursor: pointer;
  &:hover{
    background: ${navy4};
  }
`

export const Cell = styled(CellBase)`
  line-height: ${cellFraction}vh;
  font-size: ${0.4 * cellFraction}vh;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

export const CellMiddleText = styled(CellBase)`
  line-height: ${0.5 * cellFraction}vh;
  font-size: ${0.3 * cellFraction}vh;
`

export const CellLongText = styled(CellBase)`
  line-height: ${0.33 * cellFraction}vh;
  font-size: ${0.145 * cellFraction}vh;
`

/**
 * `grid-row: 6` in order to stick it to the bottom of its parrent grid
 */
export const RelatedNav = styled.div`
  grid-row: 6;
  height: ${0.5 * cellFraction}vh;
  display: grid;
  grid-gap:12%;
  padding: 5% 12%;
  grid-template-columns: 1fr 1fr;
  button{
    font-size: ${0.4 * cellFraction}vh;
  }
`

export const TopLeft = styled.div`
  grid-area: top_left;
  text-align: center;
  margin-left: 0.5vmin;
  line-height: 3.3vh;
  font-size: 2.9vh;
  font-family: 'Poiret One', cursive;
  width: 29vw;
`

export const TopUp = styled(TopLeft)`
  grid-area: top_up;
`

export const TopRight = styled(TopLeft)`
  grid-area: top_right;
`

export const MiddleLeft = styled(DynamicContainer)`
  grid-area: middle_left;
`

export const MiddleUp = styled(DynamicContainer)`
  grid-area: middle_up;
`

export const MiddleRight = styled(DynamicContainer)`
  grid-area: middle_right;
`

export const Bottom = styled.div`
  grid-area: bottom_area;
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  grid-gap: 1%;

  div {
    text-align: center;
    cursor: pointer;
  }

  button{
    font-size: 2.5vh;
  }
`

export const NavNext = styled.div`
  text-align: center;
  grid-area: nav_next;
  button{
    width: 11vw;
  }
`

export const NavMode = styled(NavNext)`
  grid-area: nav_mode;
`
