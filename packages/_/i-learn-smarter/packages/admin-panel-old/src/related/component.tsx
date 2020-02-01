import {
  Bottom,
  Container,
  MiddleLeft,
  MiddleUp,
  NavMode,
  NavNext,
  TopLeft,
  TopRight,
  TopUp,
} from './styled'

import * as React from 'react'
import { ModeButton, NextButton } from '../admin_repair/buttons'
import { BottomFactory } from './bottomFactory'
import { Factory } from './factory'
import { MiddleRight } from './styled'

export function Related(props: AdminRepairProps) {
  const { currentInstance } = props.adminRepairStore

  return (
    <Container>
      <TopLeft><p>{currentInstance.deWord}</p></TopLeft>
      <TopUp><p>{currentInstance.enWord}</p></TopUp>
      <TopRight><p>{currentInstance.bgWord}</p></TopRight>

      <MiddleLeft><Factory {...props} mode='de' /></MiddleLeft>
      <MiddleUp><Factory {...props} mode='en' /></MiddleUp>
      <MiddleRight><Factory {...props} mode='bg' /></MiddleRight>

      <Bottom>
        <BottomFactory {...props} mode='de' />
        <BottomFactory {...props} mode='en' />
        <BottomFactory {...props} mode='bg' />
      </Bottom>

      <NavNext><NextButton {...props} /></NavNext>
      <NavMode><ModeButton {...props} /></NavMode>
    </Container >
  )
}
