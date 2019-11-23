import styled, {keyframes} from 'styled-components'
import {pink4, dark, teal, red5, blue7, pink5, red} from 'colors'
import { log } from 'util';
const MARGIN = 5

export const Container = styled.div`
  width: 90vw;
  height: 90vh;
  margin: ${MARGIN}vh ${MARGIN}vw ${MARGIN}vh ${MARGIN}vw;
  display: grid;
  grid-template-rows: repeat(2, 1fr);
  grid-template-columns: repeat(2, 1fr);  
`

export const WordsContainer = styled.div`
  grid-column: span 2;
  grid-row: 0 / 2;
  display: grid;
  width: 90vw;
  height: 45vh;
  grid-template-columns: repeat(3, 1fr);
  grid-template-rows: repeat(2, 1fr);
  span{
    text-align: center;
    font-size: 5.5vh;
    line-height: 22.5vh;
    font-family: 'Pacifico', cursive;
    text-shadow: ${red} 2px 2px 1px; 
    background: ${blue7};
    color: ${pink5};
  }
`

export const ImagesContainer = styled.div`
  grid-column: span 2;
  grid-row: 2 / 4;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  img{
    width: auto;
    height: 45vh;
  }
`

export const ImageLeft = styled.div`
  justify-self: end;
`

export const ImageRight = styled.div`
  justify-self: start;
`

export const Off = styled.span`
  visibility: hidden;
`

export const On = styled.span`
  visibility: visible;
`

const animationOut = keyframes`
  0% {
    opacity: 1;
  }
  
  100% {
    opacity: 0;
  }
`

const animationIn = keyframes`
  0% {
    opacity: 0;
    animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: scale3d(1, 1, 1);
  }
  
  0% {
    opacity: 0.55;
    animation-timing-function: cubic-bezier(0.42, 0, 0.58, 1);
    transform: scale3d(0.83, 0.83, 0.83);
  }
  
  100% {
    opacity: 1;
    animation-timing-function: cubic-bezier(0.25, 0.46, 0.45, 0.94);
    transform: scale3d(1, 1, 1);
  }
`

const Base = styled.span`
  animation-fill-mode: forwards;
  animation-duration: 1s;
  animation-timing-function: ease-in-out;
`

export const Out = (i: number) => Base.extend`
  animation-name: ${animationOut};
  animation-delay: ${50 * i}ms;
`

export const In = Base.extend`
  animation-name: ${animationIn};
`