import * as React from 'react'
import { delay, nextIndex, defaultTo, waitFor } from 'rambdax'
import localforage from 'localforage'
import { imageWideKeyAnt } from '../ants/imageWideKey'
import { getImageContainer } from '../constants'

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
      data: undefined,
      index: 0,
      loading: false
    }
    this.asyncSetState = this.asyncSetState.bind(this)
    this.step = this.step.bind(this)
    this.handleLoaded = this.handleLoaded.bind(this)
    this.isLoading = this.isLoading.bind(this)
    this.stepAnt = this.stepAnt.bind(this)
  }

  asyncSetState(newState){
    return new Promise(resolve => {
      this.setState(newState, resolve)
    })
  }
  handleLoaded(){
    if(this.state.loading) {
      this.setState({loading: false})
    }

  }
  isLoading(){
    return !this.state.loading  
  }
  async stepAnt(){
    return await waitFor(this.isLoading, this.tick * 4)()
  }
  async step(index){
    await this.asyncSetState({
      index,
      loading: true
    })
    await this.stepAnt()
  }

  async componentDidMount(){
    const prepared = await prepare(this.props.hypnoList)
    await this.asyncSetState({data:prepared})

    let index = 0
    while (true){
      index = nextIndex(index, prepared)
      await Promise.all([
        this.step(index),
        delay(this.tick)
      ])  
    }
  }

  render(){
    if (this.state.data === undefined) return ''
    console.log(this.state[this.state.activeList]);
    
    const sk = this.state[this.state.activeList][this.state.index]

    if(!sk){
      // optional pass to onErrorFallback so the consumer can remove the key from 
      // localstorage
      console.log('sk is null');
      
      return null
    }
    
    const ImageContainer = getImageContainer(sk.isWide)

    return (
      <ImageContainer>
        <img
          src={sk.src}
          onLoad={this.handleLoaded}
          onError={this.handleLoaded}
        />
      </ImageContainer>
    )
  }
}

