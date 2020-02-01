import styled from 'styled-components'
import { CenteredItem } from '../../_styled/grid'
import { ImageBase } from '../../_styled/image'
import { frHeight } from './grid'

export const ImageContainer = styled(CenteredItem)`
  grid-area: gw_image;
  height: ${5 * frHeight}vh;
  width: 100%;
`

export const Image = ImageBase
