import * as React from 'react'

import { click, next } from './actions'
import { Container } from './styled/grid'
import { Image, ImageContainer } from './styled/image'
import { Select, SelectContainer } from './styled/select'
import { Translation, TranslationContainer } from './styled/translation'
import { WordsContainer } from './styled/words'

interface SelectComponentInterface{
  dispatch: any
  i: number
  listen: boolean
  article: SelectableArticle
}

function SelectComponent(input: SelectComponentInterface){
  const {article, i, dispatch, listen} = input
  const onClick = _ => {
    if (listen){
      return dispatch(
        click({
          article,
          word: _.target.textContent,
        }),
      )
    }
    dispatch(next())
  }

  return (
    <SelectContainer>
      {
        article.articleSet.map((_, j) =>
          <Select
            className={`selectable_${_.status.toLowerCase()}`}
            key={`${i}_${j}`}
            onClick={onClick}
          >
            {_.value}
          </Select>,
        )
      }
    </SelectContainer>
  )
}

export class SelectArticle extends React.PureComponent<SelectArticleProps, {}> {
  public render() {
    const {
      wordList,
      toPart,
      imageSrc,
    } = this.props.selectArticleStore.currentInstance

    return (
      <Container>

        <WordsContainer>
          {
            wordList.map((_, i) => {
              if (typeof _ === 'string'){

                return <span key={i}>{_}</span>
              }

              return (
                <SelectComponent
                  i={i}
                  key={i}
                  article={_}
                  dispatch={this.props.dispatch}
                  listen={this.props.selectArticleStore.listen}
                />
              )
            })
          }
        </WordsContainer>

        <ImageContainer>
          <Image src={imageSrc} />
        </ImageContainer>

        <TranslationContainer>
          <Translation>{toPart}</Translation>
        </TranslationContainer>

      </Container>
    )
  }
}
