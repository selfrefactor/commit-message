import * as React from 'react'
import styled from 'styled-components'
import { defaultTo } from 'rambdax'
import localforage from 'localforage'
import { convertImageBee } from '../bees/convertImage'
import { imageWideKeyAnt } from '../ants/imageWideKey'

const WIDE = 'WIDE'
const TALL = 'TALL'

const imgWide = `img{
    max-width: 100%;
    max-height: 100%;
    height: auto;
}`
const imgTall = `img{
  width: auto;
     max-width: 100%;
    max-height: 100%;
}`

export async function clearStorage(){
  const numberOfKeys = await localforage.length()
  await localforage.clear()
  console.log({ numberOfKeys })
}

function isImageWide(imageUrl){
  return new Promise(resolve => {
    const img = new Image()
    img.onload = function(){
      resolve(this.width > this.height)
    }
    img.src = imageUrl
  })
}

export async function getConverted(
  uniqKey,
  imageUrl,
  maybeIsWide
){
  const stored = await localforage.getItem(uniqKey)
  if (stored !== null){
    const storedIsWide = await localforage.getItem(
      imageWideKeyAnt(uniqKey)
    )

    return {
      isWide    : storedIsWide,
      imageData : stored,
      persist   : false,
    }
  }

  if (maybeIsWide){
    const imageData = await convertImageBee(imageUrl)

    return {
      isWide  : maybeIsWide,
      imageData,
      persist : true,
    }
  }

  const result = await Promise.all([
    isImageWide(imageUrl),
    convertImageBee(imageUrl),
  ])

  return {
    isWide    : result[ 0 ],
    imageData : result[ 1 ],
    persist   : true,
  }
}

export async function convert(input){
  const { isWide, imageData, persist } = await getConverted(
    input.uniqKey,
    input.src,
    input.isWide,
  )
  if (persist){
    await Promise.all([
      localforage.setItem(input.uniqKey, imageData),
      localforage.setItem(imageWideKeyAnt(input.uniqKey), isWide),
    ])
  }
}

export class ImageLocalStorage extends React.Component{
  constructor(props){
    super(props)
    this.state = {
      mode      : undefined,
      imageData : undefined,
      ready     : false,
    }
  }

  async componentDidMount(){
    const { isWide, imageData, persist } = await getConverted(
      this.props.uniqKey,
      this.props.src,
      this.props.isWide
    )

    this.setState({
      imageData,
      ready : true,
      mode  : isWide ? WIDE : TALL,
    }, () => {
      if (persist){
        Promise.all([
          localforage.setItem(this.props.uniqKey, imageData),
          localforage.setItem(imageWideKeyAnt(this.props.uniqKey), isWide),
        ]).then(() => {
          if (this.props.callback) this.props.callback()
        })
      } else if (this.props.callback) this.props.callback()
    })
  }

  render(){
    if (!this.state.ready) return ''

    const {
      evalStyled,
      src,
      ...extraProps
    } = this.props

    const ImageContainer = styled.div`
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      ${ defaultTo('', evalStyled) }
      ${ this.state.mode === WIDE ? imgWide : imgTall }
    `

    return (
      <ImageContainer { ...extraProps }>
        <img src={ this.state.imageData } />
      </ImageContainer>
    )
  }
}

