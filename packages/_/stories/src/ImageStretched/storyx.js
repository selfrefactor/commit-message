import * as React from 'react'
import { ImageStretched } from './component'
import { gifLarge, imageFirst, imageSecond, imageThird, imageFourth } from '../mocks'

export default { title: 'Image stretched' }

export const largeGif = () => (
  <ImageStretched src={ gifLarge } />
)
export const one = () => (
  <ImageStretched src={ imageFirst } />
)
export const two = () => (
  <ImageStretched src={ imageSecond } />
)
export const three = () => (
  <ImageStretched src={ imageThird } />
)
export const four = () => (
  <ImageStretched src={ imageFourth } />
)
