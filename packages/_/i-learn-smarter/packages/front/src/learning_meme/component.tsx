import { getter } from 'client-helpers'
import * as React from 'react'
import { connect } from 'react-redux'
import { init, listen as listenAction } from './actions'

import { acceptSpeech } from './auto_mode/acceptSpeech'
import { Container } from './styled/grid'
import { Image, ImageContainer } from './styled/image'
import { Input, InputContainer } from './styled/input'
import { Question, QuestionContainer } from './styled/question'
import { Sentence, SentenceContainer } from './styled/sentence'
import { Translation, TranslationContainer } from './styled/translation'

export class LearningMeme extends React.Component<LearningMemeProps, {}> {
  constructor(props: LearningMemeProps) {
    super(props)
    this.onInput = this.onInput.bind(this)
  }

  public onInput(event: any) {
    if (event.key === 'Enter') {
      return this.props.dispatch(listenAction('ENTER'))
    }

    this.props.dispatch(listenAction(event.target.value))
  }

  public componentDidMount() {
    if (getter('mic')) acceptSpeech()

    this.props.dispatch(init())
  }

  public render() {
    const {
      convertedImage,
      currentInstance,
      inputState,
      listen,
      question,
      ready,
      sentence,
    } = this.props.learningMemeStore

    const imageSource = currentInstance === undefined ?
      '' :
      convertedImage === false ?
        currentInstance.imageSrc :
        convertedImage

    return (
      <div>
        {ready &&
          <Container>

            <InputContainer>
              <Input id='lm_input'>
                <input
                  autoFocus={ready}
                  onChange={this.onInput}
                  onKeyPress={this.onInput}
                  type='text'
                  value={inputState}
                />
              </Input>
            </InputContainer>

            <QuestionContainer>
              <Question id='lm_question'>

                {
                  listen &&
                  <div>
                    <span className='fromWord'>
                      {question}
                    </span>

                    <span className='toWord'>
                      {currentInstance.toWord}
                    </span>
                  </div>
                }

                {
                  !listen &&
                  <div>
                    <span className='fromWord'>
                      {currentInstance.fromWord}
                    </span>

                    <span className='toWord'>
                      {currentInstance.toWord}</span>
                  </div>
                }

              </Question>
            </QuestionContainer>

            <SentenceContainer>
              <Sentence id='lm_context'>

                {
                  !listen &&
                  <span>
                    {sentence.hidden}
                  </span>
                }

                {
                  listen &&
                  <span>
                    {sentence.visible}
                  </span>
                }

              </Sentence>
            </SentenceContainer>

            <ImageContainer id='lm_image'>
              <Image
                src={imageSource}
              />
            </ImageContainer>

            <TranslationContainer>
              <Translation id='lm_translated'>
                {currentInstance.toPart}
              </Translation>
            </TranslationContainer>

          </Container>
        }
      </div>
    )
  }
}

const connectComponent = ({ learningMemeStore }) => ({ learningMemeStore })

export const LearningMemeWrapped = connect(connectComponent)(LearningMeme)
