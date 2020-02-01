import { DARK_BLUE_3, GREEN_6 } from 'colors'
import styled from 'styled-components'
import { CenteredItem, Text } from '../../_styled/grid'

export const TranslationContainer = styled(CenteredItem)`
  grid-area: sa_translation;
  outline: solid ${GREEN_6};
`

export const Translation = styled(Text)`
  color: ${DARK_BLUE_3};
`
