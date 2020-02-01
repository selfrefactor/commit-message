import { maybe } from 'rambdax'
import * as React from 'react'
import {
  AnswerHidden,
  AnswerVisible,
  AnswerVisibleWrong,
} from './styled/answer'

/**
 * Shows the word if it is either pending or current
 * If the word is already passed, then hide it
 */
export function AnswerList(props: any) {
  const {okCorrect, question, index } = props

  return (
    <React.Fragment>

    {question.map((questionInstance, i) => {
      const AnswerSpan = maybe<any>(
        i < index,
        okCorrect[i] ? AnswerVisible : AnswerVisibleWrong,
        AnswerHidden,
      )

      return (
        <AnswerSpan key={`ws-answer-${i}`}>
          {questionInstance.hidden}
        </AnswerSpan>
      )
    })}

    </React.Fragment>
  )
}
