import * as React from 'react'
import styled from 'styled-components'
import { wordProfileListAnt } from '../ants/wordProfileList'
import { wordProfileDataAnt } from '../ants/wordProfileData'
import { wordProfileAddAnt } from '../ants/wordProfileAdd'
import { translateAnt } from '../ants/translate'
import {
  shuffle,
  path,
  nextIndex,
  prevIndex,
  findIndex,
  ok,
  random,
  delay,
} from 'rambdax'
import { Cell, Grid } from '../../src/Grid/component.js'
import { Select } from '../../src/Select/component.js'
import { Navigation, WordProfile, recalculateFontSize } from './component'

import {
  getter,
  setter,
  initLocalState,
  initialGetLocalize,
} from 'client-helpers'
import { Options } from '../../src/Options/component'

initLocalState('WORD_PROFILE')

const randomOrderOption = {
  label: 'random.order',
  type: 'TOGGLE',
  visibleLabel: 'Random order when press next',
  value: initialGetLocalize({
    key: 'random.order',
    defaultValue: true,
  }),
}
const recalculateFontOption = {
  label: 'recalculate.font',
  type: 'CALLBACK',
  visibleLabel: 'Recalculate font size',
  callback: () => {
    recalculateFontSize()
    window.location.reload(false)
  },
}

const evalStyled = 'outline: 1px solid pink'
const centeredStyle = `
text-align: center;
`

const labelStyle = `
text-align: center;
font-size: 70%;
font-weight: 200;
color: #78a;
`

const sortWords = words => words.sort((x, y) => (x < y ? -1 : 1))

export class WordProfileComplete extends React.Component{
  constructor(props){
    super(props)
    this.OPTIONS = [ randomOrderOption, recalculateFontOption ]
    this.state = {
      ready: false,
      password: getter('PASSWORD'),
      word: undefined,
      index: -1,
      translation: 'translate result',
      notification: 'notification',
      wordList: [],
      data: {},
    }

    this.selectChange = this.selectChange.bind(this)
    this.handleOptionsCallback = this.handleOptionsCallback.bind(this)
    this.translateRequestPress = this.translateRequestPress.bind(this)
    this.addWordPress = this.addWordPress.bind(this)
    this.nextStep = this.nextStep.bind(this)
    this.missingPassword = this.missingPassword.bind(this)
    this.arrowLeft = this.arrowLeft.bind(this)

    this._setState = this._setState.bind(this)
  }

  handleOptionsCallback({ type }){
    if (type !== 'UPDATE_OPTIONS') return
    delay(500).then(() => window.location.reload(false))
  }

  async componentDidMount(){
    if (!this.state.password) return this.missingPassword()

    const wordListRaw = await wordProfileListAnt(this.state.password)
    const initialIndex = random(0, wordListRaw.length - 1)
    const wordList = randomOrderOption.value ?
      shuffle(wordListRaw) :
      wordListRaw

    // const currentWord = 'ruhevoll'
    const currentWord = this.state.word ?
      this.state.word :
      wordList[ initialIndex ]

    const data = await wordProfileDataAnt(currentWord, this.state.password)

    this._setState({
      data,
      ready: true,
      wordList,
      currentWord,
      index: initialIndex,
    })
  }

  missingPassword(){
    const password = window.prompt('Password is needed!')
    if (!password) throw 'password'
    setter('PASSWORD', password)

    window.location.reload()
  }

  async selectChange(selected){
    const { wordList, password } = this.state
    const newIndex = findIndex(x => x === selected, wordList)

    const data = await wordProfileDataAnt(selected, password)

    this._setState({
      data,
      currentWord: selected,
      index: newIndex,
    })
  }

  arrowLeft(){
    this.nextStep('DEC')
  }

  async nextStep(indexMode){
    const { wordList, index, password } = this.state

    const indexMethod = indexMode === 'INC' ? nextIndex : prevIndex

    const newIndex = indexMethod(index, wordList)
    const currentWord = wordList[ newIndex ]
    const data = await wordProfileDataAnt(currentWord, password)

    this._setState({
      data,
      currentWord,
      index: newIndex,
    })
  }

  addWordPress(e){
    if (e.key !== 'Enter') return
    const wordToAdd = e.target.value.trim().toLowerCase()
    e.target.value = ''

    wordProfileAddAnt(wordToAdd, this.state.password).then(({ status }) => {
      const notification =
        status === 'ADDED_TO_PENDING' ?
          `'${ wordToAdd }' is added` :
          `'${ wordToAdd }' in error`

      this._setState({ notification })
    })
  }

  translateRequestPress(e){
    if (e.key !== 'Enter') return
    const textToTranslate = e.target.value.trim().toLowerCase()

    e.target.value = ''

    translateAnt(textToTranslate, this.state.password).then(translation =>
      this._setState({ translation })
    )
  }

  render(){
    const {
      currentWord,
      data,
      notification,
      ready,
      translation,
      wordList,
    } = this.state

    if (!ready) return null

    const SearchInput = styled.input`
      font-size: 3vh;
      padding-left: 5px;
      color: #565;
    `

    const TranslateRequestCell = (
      <React.Fragment>
        <Cell
          evalStyled={labelStyle}
          height={8}
          topLeft={{
            x: 6,
            y: 0,
          }}
          width={5}
        >
          translate
        </Cell>

        <Cell
          evalStyled={labelStyle}
          height={4}
          topLeft={{
            x: 6,
            y: 11,
          }}
          width={5}
        >
          {translation}
        </Cell>
        <Cell
          evalStyled={centeredStyle}
          height={8}
          topLeft={{
            x: 6,
            y: 4,
          }}
          width={5}
        >
          <SearchInput size={12} onKeyPress={this.translateRequestPress} />
        </Cell>
      </React.Fragment>
    )

    const AddWordCell = (
      <React.Fragment>
        <Cell
          evalStyled={labelStyle}
          height={8}
          topLeft={{
            x: 11,
            y: 0,
          }}
          width={5}
        >
          add word
        </Cell>
        <Cell
          evalStyled={labelStyle}
          height={4}
          topLeft={{
            x: 11,
            y: 11,
          }}
          width={5}
        >
          {notification}
        </Cell>

        <Cell
          evalStyled={centeredStyle}
          height={8}
          topLeft={{
            x: 11,
            y: 4,
          }}
          width={5}
        >
          <SearchInput size={12} onKeyPress={this.addWordPress} />
        </Cell>
      </React.Fragment>
    )

    const NavigationCell = (
      <Cell
        evalStyled={evalStyled}
        height={8}
        topLeft={{
          x: 0,
          y: 0,
        }}
        width={6}
      >
        <Navigation color='#ca4' nextStep={this.nextStep} />
      </Cell>
    )

    const wordCellStyle = `
       font-size: 4vh;
       text-align: center;   
       display: flex;
       justify-content: center;
       align-items: center;  
    `

    const WordCell = (
      <Cell
        evalStyled={wordCellStyle}
        height={8}
        id='foo'
        topLeft={{
          x: 0,
          y: 8,
        }}
        width={6}
      >
        <Select
          current={currentWord}
          list={sortWords(wordList)}
          onChange={this.selectChange}
        />
      </Cell>
    )

    const Chrome = (
      <Cell
        evalStyled={evalStyled}
        height={4}
        subgridFlag={true}
        topLeft={{
          x: 0,
          y: 0,
        }}
        width={32}
      >
        {TranslateRequestCell}
        {AddWordCell}
        {NavigationCell}
        {WordCell}
      </Cell>
    )

    return (
      <Grid>
        <Options
          callback={this.handleOptionsCallback}
          keyBinding={this.props.optionsKeyBinding}
          label='word.profile'
          options={this.OPTIONS}
        />

        {Chrome}
        <WordProfile
          arrowLeft={this.arrowLeft}
          json={fixData(data)}
          word={currentWord}
        />
      </Grid>
    )
  }

  _setState(newState){
    this.setState(newState)
  }
}

function fixData(data){
  const relatedExists = path('related.0', data)
  if (!relatedExists) return data

  const newRelated = data.related.map(x => {
    ok(x)(Object)
    const okTranslation =
      x.german.toLowerCase() !== x.translation.toLowerCase()

    if (!okTranslation){
      return {
        german: x.german,
        translation: '',
      }
    }

    return x
  })

  return {
    ...data,
    related: newRelated,
  }
}
