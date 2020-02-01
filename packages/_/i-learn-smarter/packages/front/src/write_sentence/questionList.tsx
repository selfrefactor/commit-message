import * as React from 'react'
import {
  QuestionActive,
  QuestionHidden,
  QuestionVisible,
} from './styled/question'

/**
 * Shows the correct words according to the local index counter
 */
export function QuestionList(props: any) {
  const { question, index } = props

  return (
    <React.Fragment>{question.map((questionInstance, i) => {

      const QuestionSpan = i === index ?
        QuestionActive :
        i > index ?
          QuestionVisible :
          QuestionHidden

      return <QuestionSpan key={`ws-question-${i}`}>
        {question[i].visible}
      </QuestionSpan>
    })
    }</React.Fragment>
  )
}
