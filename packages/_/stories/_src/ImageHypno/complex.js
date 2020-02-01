import * as React from 'react'
import { delay, splitEvery } from 'rambdax'
import localforage from 'localforage'
import { imageWideKeyAnt } from '../ants/imageWideKey'
import { getImageContainer } from '../../constants'
const ImageWide = getImageContainer(true)
const ImageTall = getImageContainer(false)

export function ImageComponent({ isWide, src }){
  if (isWide) return <ImageWide><img src={ src } /></ImageWide>

  return <ImageTall><img src={ src } /></ImageTall>
}

const LISTS = [ 'firstList', 'secondList' ]

function toggle(x, list){
  return x === list[ 0 ] ?
    list[ 1 ] :
    list[ 0 ]
}

async function ant(key){
  const [
    src,
    isWide,
  ] = await Promise.all([
    localforage.getItem(key),
    localforage.getItem(imageWideKeyAnt(key)),
  ])

  return {
    src,
    isWide,
  }
}

async function rabbit(keys){
  return Promise.all(keys.map(ant))
}

export class ImageHypnoComplex extends React.Component{
  constructor(props){
    super(props)
    this.fullList = splitEvery(
      this.props.chunkSize,
      this.props.hypnoList
    )
    this.state = {
      generalIndex : 1,
      firstList    : null,
      secondList   : null,
      activeList   : 'firstList',
      index        : 0,
    }
  }

  asyncSetState(newState){
    return new Promise(resolve => {
      this.setState(newState, resolve)
    })
  }

  async componentDidMount(){
    await this.init()
    while (true){
      await delay(this.props.tick)
      if (this.state.index === this.props.chunkSize - 1){
        await this.asyncSetState({
          index      : 0,
          activeList : toggle(this.activeList, LISTS),
        })
        // The whole point is to create a race condition
        // (as overHedge is not blocking)
        // between converting the inactive(lazy) list
        // and completing 100 of this loop
        this.overHedge()
      } else {
        this.setState({ index : this.state.index + 1 })
      }
    }
  }

  async init(){
    const [ firstList, secondList ] = await Promise.all([
      rabbit(this.fullList[ 0 ]),
      rabbit(this.fullList[ 1 ]),
    ])
    await this.asyncSetState({
      firstList,
      secondList,
    })
  }

  async overHedge(){
    const generalIndex = this.state.generalIndex === this.fullList.length - 1 ?
      0 :
      this.state.generalIndex + 1
    const lazyList = toggle(this.activeList, LISTS)
    const newList = await rabbit(this.fullList[ generalIndex ])

    this.setState({
      generalIndex,
      [ lazyList ] : newList,
    })
  }

  render(){
    if (!this.state.firstList) return null
    const sk = this.state[ this.state.activeList ][ this.state.index ]

    if (!sk){
      console.log('sk is null')

      return null
    }

    return <ImageComponent { ...sk } />
  }
}
