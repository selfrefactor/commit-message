import * as React from 'react'
import { ImageHypnoSimple } from './simple'
import { ImageHypnoComplex } from './complex'
const CHUNK_SIZE = 100

export function ImageHypno(props){
  if (props.hypnoList.length < 4 * CHUNK_SIZE){
    console.log('LESS')

    return <ImageHypnoSimple { ...props } />
  }
  console.log('MORE')

  return <ImageHypnoComplex chunkSize={ CHUNK_SIZE } { ...props } />
}
