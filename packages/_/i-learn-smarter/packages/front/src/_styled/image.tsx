import styled from 'styled-components'
import { height } from './grid'

export function getImageContainer(
  heightMultiplier: number,
  gridArea: string,
) {

  return styled.div`
    text-align: center;
    grid-area: ${gridArea};
    height: ${heightMultiplier * height}vh;
    width: 100%;
  `

}

export const ImageBase = styled.img`
  width: auto;
  height: 100%;
`
