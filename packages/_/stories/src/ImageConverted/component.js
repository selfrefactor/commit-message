import * as React from 'react'
import { getImageContainer } from '../../constants'

export function ImageConverted({
  src,
  isWide,
}){
  const ImageContainer = getImageContainer(isWide)

  return (
    <ImageContainer>
      <img src={ src } />
    </ImageContainer>
  )
}

