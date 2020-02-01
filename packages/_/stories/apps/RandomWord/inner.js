import { glue } from 'rambdax'
import React from 'react'
import { Cell } from '../../src/Grid/component'

const WordStyle = glue(`
  text-align: right;
  font-size: 5.2vh
  text-decoration: underline
  color: #226
`, ';')

const TranslatedStyle = glue(`
  font-size: 5vh
  color: #226c
`, ';')

const ExampleStyle = glue(`
line-height:1.7;
font-size: 4.5vh
color: #420e
`, ';')

const ExampleTranslatedStyle = glue(`
  line-height:1.4;
  font-size: 4.3vh
  color: #420a
`, ';')

export const Inner = instance => (
  <React.Fragment>
    <Cell
      evalStyled={WordStyle}
      height={ 4 }
      topLeft={ {
        x : 2,
        y : 6,
      } }
      width={ 12 }
    >
      {instance.word}
    </Cell>
    <Cell
      evalStyled={TranslatedStyle}
      height={ 4 }
      topLeft={ {
        x : 17,
        y : 6,
      } }
      width={ 12 }
    >
      {instance.translated}
    </Cell>
    <Cell
      evalStyled={ExampleStyle}
      height={ 6 }
      topLeft={ {
        x : 2,
        y : 15,
      } }
      width={ 28 }
    >
      {instance.exampleSentence}
    </Cell>
    <Cell
      evalStyled={ExampleTranslatedStyle}
      height={ 6 }
      topLeft={ {
        x : 2,
        y : 24,
      } }
      width={ 28 }
    >
      {instance.exampleSentenceTranslated}
    </Cell>
  </React.Fragment>
)
