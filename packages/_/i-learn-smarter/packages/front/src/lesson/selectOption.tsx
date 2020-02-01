import { DARK_BLUE_3 } from 'colors'
import { allTrue, filter, head, length, map, piped } from 'rambdax'
import * as React from 'react'
import styled from 'styled-components'
import { ContainerBase } from '../_styled/grid'
import { Select, SelectContainer } from '../select_article/styled/select'
import { click } from './actions'

function SelectComponent(input: any){
  const {options, i, dispatch} = input
  const onClick = _ => dispatch(
    click({i, selection: _.target.textContent}),
  )

  return (
    <SelectContainer>
      {
        options.map((_, j) =>
          <Select
            className={`selectable_${_.status.toLowerCase()}`}
            key={`${i}_${j}`}
            onClick={onClick}
          >
            {_.text}
          </Select>,
        )
      }
    </SelectContainer>
  )
}

const Container = styled(ContainerBase)`
  grid-template-columns: 1fr;
  grid-template-rows: 3fr 7fr 2fr 1fr;
`

const WordsContainer = styled.div`
  width: 100%;
  text-align: center;
  span{
    margin: 0 0.4vw;
  }
`

const Translation = styled.div`
  width: 100%;
  text-align: center;
  color: ${DARK_BLUE_3};
  text-decoration: underline;
`

function showTranslate(question: any){
  return piped(
    question,
    filter(Array.isArray),
    map(head),
    filter((x: any) => x.status === 'ACTIVE'),
    length,
  ) === 0
}

export function SelectOption({store, dispatch}: any){
  const showTraslatePass = allTrue(
    showTranslate(store.question),
    store.currentStep.translation !== '',
  )

  return (
    <Container>
      <div />
      <WordsContainer>
        {
          store.question.map((_, i) => {
            if (typeof _ === 'string'){

              return <span key={i}>{_}</span>
            }

            return (
              <SelectComponent
                i={i}
                key={i}
                options={_}
                dispatch={dispatch}
              />
            )
          })
        }
      </WordsContainer>
      {showTraslatePass ? <Translation>{store.currentStep.translation}</Translation> : ''}

    </Container>
  )
}
