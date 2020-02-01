import styled from 'styled-components'
import { CenteredItem, height } from '../../_styled/grid'
import { ImageBase } from '../../_styled/image'

export const ImageContainer = styled(CenteredItem)`
  grid-area: image;
  height: ${height * 7}vh;
  width: 100%;
`

export const Image = ImageBase
