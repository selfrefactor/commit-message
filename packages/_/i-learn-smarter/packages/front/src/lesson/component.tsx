import { DARK_2, BACK_13 } from 'colors'
import { last } from 'rambdax'
import * as React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { init } from './actions'
import { SelectOption } from './selectOption'

const ExplanationContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 5fr 15fr 1fr;
  height: 89vh;
`

const ExplanationTitle = styled.div`
  text-align: center;
  font-size: 4vh;
  padding-top: 8vh;
  background: ${DARK_2};
  color: ${BACK_13};
`

const Line = styled.p`
  font-size: 4vh;
  padding-left: 3vh;
`
const ExplanationContent = styled.div`
  padding-top: 2vh;
`

const Gutter = styled.div``

function Example(store: LessonStore, dispatch: any){
  if (!store.showQuestion) return ''

  return <SelectOption store={store} dispatch={dispatch} />
}

function Explanation(props: LessonProps){
  const {title, text} = props.lessonStore.currentStep

  return (
    <ExplanationContainer>
      <Gutter />

      <ExplanationTitle>{title}</ExplanationTitle>

      <ExplanationContent>
        {
          text.map((singleLine, i) => (
            <Line key={`single-line-${i}`}>{singleLine}</Line>
          ))}
      </ExplanationContent>

      <Gutter />
    </ExplanationContainer>
  )
}

export class Lesson extends React.Component<LessonProps, {}> {
  public componentDidMount(){
    const tag = last(window.location.href.split('/'))

    this.props.dispatch(init(tag))
  }

  public render() {
    const { lessonStore: store} = this.props

    if (!store.ready) return  ''

    const isExample = store.currentStep.example !== undefined

    const Component = isExample ?
      Example(store, this.props.dispatch) :
      Explanation(this.props)

    return Component
  }
}

const connectComponent = ({ lessonStore }) => ({ lessonStore })

export const LessonWrapped = connect(connectComponent)(Lesson)
