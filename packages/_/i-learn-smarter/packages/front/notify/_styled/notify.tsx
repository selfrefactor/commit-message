import { switcher } from 'rambdax'
import styled, {keyframes} from 'styled-components'
import {IN} from '../constants'

const opacityIn = keyframes`
  from {
    opacity: 0;
  }
  
  to {
    opacity: 1;
  }
`

const opacityOut = keyframes`
  from {
    opacity: 1;
  }
  
  to {
    opacity: 0;
  }
`

function getOpacityAnimation(store): string{

  return switcher<string>(store.status)
    .is(IN, opacityIn)
    .default(opacityOut)
}

export function getAnimationTime(store): string{
  return '1s'
}

function getOpacity(store): number{

  return store.status === IN ?
    1 :
    0
}

function getZIndex(store): number{

  return store.status === IN ?
    9999 :
    0
}

function getBackground(store): string{

  return switcher<string>(store.mode)
    .is('INFO', '#607D8B')
    .is('ERROR', '#d71729')
    .is('WARNING', '#f46f19')
    .default('#17B978')
}

function getFontColor(store): string{

  return switcher<string>(store.mode)
    .is('INFO', '#d8e6e7')
    .is('ERROR', '#F1F1F1')
    .is('WARNING', '#EFE891')
    .default('#212125')
}

export const Container = styled.div`
  animation: ${getOpacityAnimation} ${getAnimationTime} linear;
  opacity: ${getOpacity}; 
  z-index: ${getZIndex}; 
  position: fixed;
  top: 0;
  right: 0;
  font-size: 2.7vh;
  line-height: 2.7vh;
  margin-top: 2.6vh;
  padding-top: 5.6vh;
  height: 15vh;
  margin-right: 2%;
  width: 96%;
  background: ${getBackground};
  color: ${getFontColor};
  border: #132333 2px solid;
  text-align: center;
`
