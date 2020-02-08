import * as React from 'react'

import { imageFirst } from '../mocks'
import { clearStorage, ImageLocalStorage } from './component'

// clearStorage()

export default { title: 'Image with local storage' }

export const happy = () => (
  <ImageLocalStorage src={imageFirst} uniqKey={`foo-${ imageFirst }`} />
)

export const isWide = () => (
  <ImageLocalStorage
    isWide={true}
    src={imageFirst}
    uniqKey={`foo-${ imageFirst }`}
  />
)
