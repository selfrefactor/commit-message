import * as React from 'react'
import styled from 'styled-components'
import { constantCase } from 'string-fn'
import {
  glue,
  filter,
  nextIndex,
  pluck,
  equals,
  prevIndex,
  splitEvery,
  map,
} from 'rambdax'
import { Cell } from '../../src/Grid/component.js'
import { TestCell } from '../../src/TestCell/component.js'
import { Row } from '../../src/Row/component'
import { TextCell } from '../../src/TextCell/component'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faArrowAltCircleLeft,
  faArrowAltCircleRight,
} from '@fortawesome/free-solid-svg-icons'
library.add(faArrowAltCircleLeft)
library.add(faArrowAltCircleRight)

const lineLengthLabels = {
  examples: 'examplesLineLengthLabel',
  related: 'relatedLineLengthLabel',
  meta: 'metaLineLengthLabel',
}

function getConfig(label){
  const lineLength = localStorage.getItem(lineLengthLabels[ label ])
  if (!lineLength) return 55

  return Number(lineLength)
}

const CONFIG = {
  examples: {
    fontSize: 2.45,
    length: getConfig('examples'),
    pseudoLength: 120,
    limit: 3,
  },
  meta: {
    fontSize: 1.9,
    length: getConfig('meta'),
    pseudoLength: 160,
  },
  related: {
    fontSize: 2,
    length: getConfig('related'),
    pseudoLength: 80,
    limit: 3,
  },
}

const evalExamples = glue(
  `
background: #fafafaea
color: #9c524aaa
font-weight:100
`,
  ';'
)

const evalExamplesRight = glue(
  `
text-align: right
background: #fafafaea
color: #440b0bea
`,
  ';'
)
const evalStyled = 'outline: 1px solid green'
const evalStyledMark = 'outline: 1px solid green;background: #cacaca;'
const evalRelated = 'background: #ddd;color: #8f1c3d99;'
const evalRelatedRight = glue(
  `
  text-align:right
  background: #eee 
  color: #a007
`,
  ';'
)
const evalMeta = glue(
  `
  text-align:center
  background: #cccf
  color: #455a64
`,
  ';'
)

function getTestStyled(label){
  return `
  width: 96%;
  font-size: ${ CONFIG[ label ].fontSize }vh;  
  line-height: ${ CONFIG[ label ].fontSize * 1.7 }vh;  
  height: ${ CONFIG[ label ].fontSize * 1.7 }vh;  
  margin: 0;
  padding: 0;
  `
}

export function recalculateFontSize(){
  map(x => localStorage.removeItem(x))(lineLengthLabels)
}

function getTestOptimal(label){
  return (
    <TestCell
      evalStyled={getTestStyled(label)}
      fontSize={`${ CONFIG[ label ].fontSize }vh`}
      localStorageItem={lineLengthLabels[ label ]}
      start={CONFIG[ label ].pseudoLength}
    />
  )
}

const NavigationContainer = styled.div`
  background: #f4f3f3;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;

  .cell {
    outline: 1px solid #04ac;
    background: ${ props => props.color };
    flex: 50%;
    text-align: center;
  }
`

export function Navigation({ mode = 'all', nextStep, color }){
  const onLeftClick = () => nextStep('DEC', mode)
  const onRightClick = () => nextStep('INC', mode)

  return (
    <NavigationContainer color={color}>
      <div className='cell' onClick={onLeftClick}>
        <span>
          <FontAwesomeIcon
            icon='arrow-alt-circle-left'
            title={`${ mode.toUpperCase() } previous index`}
          />
        </span>
      </div>
      <div className='cell' onClick={onRightClick}>
        <span>
          <FontAwesomeIcon
            icon='arrow-alt-circle-right'
            title={`${ mode.toUpperCase() } next index`}
          />
        </span>
      </div>
    </NavigationContainer>
  )
}

function FirstParent({ examplesDe, nextStep }){
  if (examplesDe.length === 0) return <React.Fragment />

  const NavigationExamples = (
    <Cell
      evalStyled={evalStyled}
      height={2}
      topLeft={{
        x: 0,
        y: 4,
      }}
      width={32}
    >
      <Navigation color='#cccd' nextStep={nextStep} />
    </Cell>
  )

  const Inner = (
    <Row
      loopWith={examplesDe}
      loopWithComponent={TextCell(
        CONFIG.examples.length,
        CONFIG.examples.fontSize,
        evalExamplesRight
      )}
    />
  )

  const TestOptimalLineLength = getTestOptimal('examples')

  const toRender = localStorage.getItem(lineLengthLabels.examples) ?
    Inner :
    TestOptimalLineLength

  const ExamplesDeColumn = (
    <Cell
      evalStyled={evalStyledMark}
      height={12}
      topLeft={{
        x: 0,
        y: 6,
      }}
      width={16}
    >
      {toRender}
    </Cell>
  )

  return (
    <React.Fragment>
      {NavigationExamples}
      {ExamplesDeColumn}
    </React.Fragment>
  )
}

function SecondParent({ examplesEn }){
  if (examplesEn.length === 0) return <React.Fragment />

  const Inner = (
    <Row
      loopWith={examplesEn}
      loopWithComponent={TextCell(
        CONFIG.examples.length,
        CONFIG.examples.fontSize,
        evalExamples
      )}
    />
  )

  return (
    <Cell
      evalStyled={evalStyledMark}
      height={12}
      topLeft={{
        x: 16,
        y: 6,
      }}
      width={16}
    >
      {Inner}
    </Cell>
  )
}

function ThirdParent({ relatedFirstDe }){
  if (relatedFirstDe.length === 0) return <React.Fragment />

  const Inner = (
    <Row
      loopWith={relatedFirstDe}
      loopWithComponent={TextCell(
        CONFIG.related.length,
        CONFIG.related.fontSize,
        evalRelatedRight
      )}
    />
  )

  const TestOptimalLineLength = getTestOptimal('related')

  const toRender = localStorage.getItem(lineLengthLabels.related) ?
    Inner :
    TestOptimalLineLength

  const RelatedFirstDeColumn = (
    <Cell
      evalStyled={evalStyledMark}
      height={7}
      topLeft={{
        x: 0,
        y: 18,
      }}
      width={8}
    >
      {toRender}
    </Cell>
  )

  return <React.Fragment>{RelatedFirstDeColumn}</React.Fragment>
}

function FourthParent({ relatedFirstEn }){
  if (relatedFirstEn.length === 0) return <React.Fragment />

  const Inner = (
    <Row
      loopWith={relatedFirstEn}
      loopWithComponent={TextCell(
        CONFIG.related.length,
        CONFIG.related.fontSize,
        evalRelated
      )}
    />
  )

  const RelatedFirstEnColumn = (
    <Cell
      evalStyled={evalStyledMark}
      height={7}
      topLeft={{
        x: 8,
        y: 18,
      }}
      width={8}
    >
      {Inner}
    </Cell>
  )

  return <React.Fragment>{RelatedFirstEnColumn}</React.Fragment>
}

function FifthParent({ relatedSecondDe }){
  if (relatedSecondDe.length === 0) return <React.Fragment />

  const Inner = (
    <Row
      loopWith={relatedSecondDe}
      loopWithComponent={TextCell(
        CONFIG.related.length,
        CONFIG.related.fontSize,
        evalRelatedRight
      )}
    />
  )

  const RelatedSecondDeColumn = (
    <Cell
      evalStyled={evalStyledMark}
      height={7}
      topLeft={{
        x: 16,
        y: 18,
      }}
      width={8}
    >
      {Inner}
    </Cell>
  )

  return <React.Fragment>{RelatedSecondDeColumn}</React.Fragment>
}

function SixthParent({ relatedSecondEn }){
  if (relatedSecondEn.length === 0) return <React.Fragment />

  const Inner = (
    <Row
      loopWith={relatedSecondEn}
      loopWithComponent={TextCell(
        CONFIG.related.length,
        CONFIG.related.fontSize,
        evalRelated
      )}
    />
  )

  const RelatedSecondEnColumn = (
    <Cell
      evalStyled={evalStyledMark}
      height={7}
      topLeft={{
        x: 24,
        y: 18,
      }}
      width={8}
    >
      {Inner}
    </Cell>
  )

  return <React.Fragment>{RelatedSecondEnColumn}</React.Fragment>
}

function BottomParent({ meta }){
  if (!meta) return <React.Fragment />

  const Inner = (
    <Row
      loopWith={[ meta ]}
      loopWithComponent={TextCell(
        CONFIG.meta.length,
        CONFIG.meta.fontSize,
        evalMeta
      )}
    />
  )

  const TestOptimalLineLength = getTestOptimal('meta')

  const toRender = localStorage.getItem(lineLengthLabels.meta) ?
    Inner :
    TestOptimalLineLength

  const BottomRow = (
    <Cell
      evalStyled={evalStyledMark}
      height={7}
      topLeft={{
        x: 0,
        y: 25,
      }}
      width={32}
    >
      {toRender}
    </Cell>
  )

  return <React.Fragment>{BottomRow}</React.Fragment>
}

function orderAndFilter(obj, rules){
  const keys = []
  if (equals(obj, {})) return [ [], [] ]

  const toReturn = rules
    .map(prop => {
      if (obj[ prop ].length === 0) return

      keys.push(prop)

      return obj[ prop ]
    })
    .filter(Boolean)

  return [ toReturn, keys ]
}

function parseMeta(meta, metaIndex){
  const [ filtered, filteredKeys ] = orderAndFilter(meta, [
    'contextMeaning',
    'nearAlphabetical',
    'definition',
    'description',
    'translation',
  ])
  if (filteredKeys.length === 0) return ''
  const pre = `${ constantCase(filteredKeys[ metaIndex ]) } :`

  return `${ pre } ${ filtered[ metaIndex ].join('; ') }`
}

function parse({ examples, related, meta }){
  const relatedFirstDe = related[ 0 ] ? pluck('german', related[ 0 ]) : []
  const relatedFirstEn = related[ 0 ] ? pluck('translation', related[ 0 ]) : []
  const relatedSecondDe = related[ 1 ] ? pluck('german', related[ 1 ]) : []
  const relatedSecondEn = related[ 1 ] ?
    pluck('translation', related[ 1 ]) :
    []

  const examplesDe = pluck('german', examples)
  const examplesEn = pluck('translation', examples)

  return {
    examplesDe,
    examplesEn,
    meta,
    relatedFirstDe,
    relatedFirstEn,
    relatedSecondDe,
    relatedSecondEn,
  }
}

function initialize(input){
  const examplesData = splitEvery(
    CONFIG.examples.limit,
    input.exampleSentences
  )
  const relatedData = splitEvery(CONFIG.related.limit, input.related)

  return {
    examplesData,
    meta: input.meta,
    relatedData,
  }
}

export class WordProfile extends React.Component{
  static getDerivedStateFromProps(props, state){
    if (props.word === state.currentWord) return null

    const { examplesData, relatedData, meta } = initialize(props.json)

    return {
      ...state,
      currentWord: props.word,
      examples: examplesData[ 0 ],
      examplesData,
      examplesIndex: 0,
      meta: parseMeta(meta, 0),
      metaData: meta,
      metaIndex: 0,
      related: [ relatedData[ 0 ], relatedData[ 1 ] ],
      relatedData,
      relatedIndex: 1,
    }
  }

  constructor(props){
    super(props)
    const { examplesData, relatedData, meta } = initialize(this.props.json)

    this.state = {
      currentWord: this.props.word,
      examples: examplesData[ 0 ],
      examplesData,
      examplesIndex: 0,
      meta: parseMeta(meta, 0),
      metaData: meta,
      metaIndex: 0,
      related: [ relatedData[ 0 ], relatedData[ 1 ] ],
      relatedData,
      relatedIndex: 1,
      searchInput: '',
    }
    this.nextStep = this.nextStep.bind(this)
    this.pressed = this.pressed.bind(this)
    this.arrowRight = this.arrowRight.bind(this)
  }

  componentDidMount(){
    document.addEventListener('keydown', this.pressed)
  }

  pressed(e){
    if (e.key === 'ArrowRight') return this.arrowRight()
    if (e.key === 'ArrowLeft' && this.props.arrowLeft){
      return this.props.arrowLeft()
    }
  }

  arrowRight(){
    this.nextStep('INC')
  }

  nextStep(indexMode){
    const {
      metaIndex,
      metaData,
      examplesData,
      examplesIndex,
      relatedData,
      relatedIndex,
    } = this.state

    const indexMethod = indexMode === 'INC' ? nextIndex : prevIndex

    const filtered = filter(x => x.length > 0)(metaData)
    const newMetaIndex = indexMethod(metaIndex, Object.keys(filtered))

    const newExamplesIndex = indexMethod(examplesIndex, examplesData)
    const newRelatedIndexFirst =
      relatedIndex === 1 && indexMode === 'DEC' ?
        relatedData.length - 2 :
        indexMethod(relatedIndex, relatedData)

    const newRelatedIndexSecond =
      newRelatedIndexFirst === relatedData.length - 1 ?
        newRelatedIndexFirst :
        newRelatedIndexFirst + 1

    const partial = {
      examples: examplesData[ newExamplesIndex ],
      examplesIndex: newExamplesIndex,
      meta: parseMeta(metaData, newMetaIndex),
      metaIndex: newMetaIndex,
      related: [
        relatedData[ newRelatedIndexFirst ],
        relatedData[ newRelatedIndexSecond ],
      ],
      relatedIndex: newRelatedIndexFirst,
    }

    this.setState(partial)
  }

  render(){
    const {
      meta,
      examplesDe,
      examplesEn,
      relatedFirstDe,
      relatedFirstEn,
      relatedSecondDe,
      relatedSecondEn,
    } = parse(this.state)
    const First = FirstParent({
      examplesDe,
      nextStep: this.nextStep,
    })
    const Second = SecondParent({ examplesEn })
    const Third = ThirdParent({ relatedFirstDe })
    const Fourth = FourthParent({ relatedFirstEn })
    const Fifth = FifthParent({ relatedSecondDe })
    const Sixth = SixthParent({ relatedSecondEn })
    const Bottom = BottomParent({ meta })

    return (
      <React.Fragment>
        {First}
        {Second}
        {Third}
        {Fourth}
        {Fifth}
        {Sixth}
        {Bottom}
      </React.Fragment>
    )
  }
}
