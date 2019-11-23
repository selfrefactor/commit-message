import { 
  Container, 
  ImagesContainer, 
  ImageLeft,
  ImageRight,
  In, 
  Off, 
  On, 
  Out, 
  WordsContainer, 
} from './styled/grid'
import { OUT, IN, OFF } from '../constants'

import * as React from 'react'
import { connect } from 'react-redux'
import { randomSeed } from '../_helpers/randomSeed'
import { switcher } from 'rambdax'

function RenderWord(status: string,word: string, i: number){
  const Span = switcher<any>(status)
    .is(IN, In)  
    .is(OUT, Out(i))
    .is(OFF, Off)
    .default(On)

  return (
    <Span 
      key={randomSeed()}
      id='animation'
    >
      {word}
    </Span>
  )
}

export class JokeMaker extends React.Component<Props, {}> {
  public render() {
    const {words, status, seeds} = this.props.store

    return (
      <Container>
        <WordsContainer>
          {words.map((_, i) => RenderWord(status,_, i))}
        </WordsContainer>

        <ImagesContainer>
            <ImageLeft>
              <img
                src={`https://unsplash.it/700/400?${seeds[0]}`} 
              />
            </ImageLeft>
            <ImageRight>
              <img 
                src={`https://unsplash.it/700/400?${seeds[1]}`} 
              />
            </ImageRight>
        </ImagesContainer>
      </Container>
    )
  }
}

const connectComponent = ({ store }) => ({ store })

export const JokeMakerWrapped = connect(connectComponent)(JokeMaker)


