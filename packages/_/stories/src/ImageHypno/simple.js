import * as React from 'react'
import { delay, nextIndex, defaultTo } from 'rambdax'
import localforage from 'localforage'
import { ImageConverted } from '../ImageConverted/component'
import { imageWideKeyAnt } from '../ants/imageWideKey'

async function prepareAnt(uniqKey){
  const src = await localforage.getItem(uniqKey)
  const isWide = await localforage.getItem(
    imageWideKeyAnt(uniqKey)
  )

  return {
    src,
    isWide,
  }
}

async function prepare(hypnoList){
  const promised = hypnoList.map(
    uniqKey => prepareAnt(uniqKey)
  )

  return Promise.all(promised)
}

export class ImageHypnoSimple extends React.Component{
  constructor(props){
    super(props)
    this.tick = defaultTo(200, Number(this.props.tick))
    this.state = {
      data  : undefined,
      index : 0,
    }
    this.asyncSetState = this.asyncSetState.bind(this)
  }

  asyncSetState(newState){
    return new Promise(resolve => {
      this.setState(newState, resolve)
    })
  }

  async componentDidMount(){
    const prepared = await prepare(this.props.hypnoList)
    await this.asyncSetState({ data : prepared })

    let index = 0
    while (true){
      index = nextIndex(index, prepared)
      await Promise.all([
        this.asyncSetState({ index }),
        delay(this.tick),
      ])
    }
  }

  render(){
    if (this.state.data === undefined) return ''

    return (
      <ImageConverted
        { ...this.state.data[ this.state.index ] }
      />
    )
  }
}

