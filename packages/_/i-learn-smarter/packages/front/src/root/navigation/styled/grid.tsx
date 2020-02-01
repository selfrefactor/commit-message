import styled from 'styled-components'

export const Container = styled.div`
  position: absolute;
  width: 25vw;
  height: auto;
  bottom: 11vh;
  left: 0;
  z-index: 1000;
`

export const Grid = styled.div`
  display: grid;
  grid-template-columns: 1fr 17fr 1fr;
  grid-template-rows: repeat(7, 1fr);
  grid-template-areas: ". nav_first ." 
  ". nav_second ." 
  ". nav_third ." 
  ". nav_fourth ." 
  ". nav_fifth ."
  ". nav_sixth ."
  ". nav_seventh .";
`
