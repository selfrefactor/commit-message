import { createAction } from '../createAction'
import * as React from 'react'

const base = 'add-to-buffer'

export class BufferComponent extends React.Component {
  constructor(props) {
    super(props)
    this.buttons = ['SLOW_SCROLL', 'ADD_TO_BUFFER']
    this.onBufferInput = this.onBufferInput.bind(this)
  }

  componentDidMount() {
    const h1 = document.querySelector('h1')

    const h1Value = h1 === null ?
      false :
      h1.innerText

    const description = document.querySelector('meta[name="description"]')

    const descriptionValue = description === null ?
      false :
      description.attributes.content.value

    const bufferProps = {
      custom: this.props.rootStore.buffer.custom,
      description: descriptionValue,
      h1: h1Value,
      title: document.title,
    }

    this.props.dispatch(
      createAction('SET_BUFFER_PROPS', bufferProps),
    )
  }

  onBufferInput({ type, event }) {
    if (event.key === 'Enter') {
      this.props.dispatch(createAction(
        'BUFFER_SUBMIT',
        type,
      ))
    }
  }

  render() {
    return (
      <div className={`${base}__container`}>
        <div className={`${base}__grid`}>

          <div className={`${base}__grid--item`}>
            <input
              type='text'
              onKeyPress={event => this.onBufferInput({ type: 'title', event })}
              value={this.props.rootStore.buffer.title}
              onChange={event => this.props.dispatch(createAction(
                'BUFFER_INPUT',
                { inputType: 'title', newValue: event.target.value },
              ))}
            />
          </div>

          <div className={`${base}__grid--item`}>
            <button
              onClick={() => this.onBufferInput({
                event: { key: 'Enter' },
                type: 'title',
              })}
            >Submit</button>
          </div>

          {this.props.rootStore.buffer.h1 !== false &&
            <div className={`${base}__grid--item`}>
              <input
                type='text'
                value={this.props.rootStore.buffer.h1}
                onKeyPress={event => this.onBufferInput({ type: 'h1', event })}
                onChange={event => this.props.dispatch(createAction(
                  'BUFFER_INPUT',
                  { inputType: 'h1', newValue: event.target.value },
                ))}
              />
            </div>}

          {this.props.rootStore.buffer.h1 !== false &&
            <div className={`${base}__grid--item`}>
              <button
                onClick={() => this.onBufferInput({
                  event: { key: 'Enter' },
                  type: 'h1',
                })}
              >Submit</button>
            </div>}

          {this.props.rootStore.buffer.description !== false &&
            <div className={`${base}__grid--item`}>
              <input
                type='text'
                value={this.props.rootStore.buffer.description}
                onKeyPress={event => this.onBufferInput({ type: 'description', event })}
                onChange={event => this.props.dispatch(createAction(
                  'BUFFER_INPUT',
                  { inputType: 'description', newValue: event.target.value },
                ))}
              />
            </div>}

          {this.props.rootStore.buffer.description !== false &&
            <div className={`${base}__grid--item`}>
              <button
                onClick={() => this.onBufferInput({
                  event: { key: 'Enter' },
                  type: 'description',
                })}
              >Submit</button>
            </div>}

          <div className={`${base}__grid--item`}>
            <input
              type='text'
              value={this.props.rootStore.buffer.custom}
              onKeyPress={event => this.onBufferInput({ type: 'custom', event })}
              onChange={event => this.props.dispatch(createAction(
                'BUFFER_INPUT',
                { inputType: 'custom', newValue: event.target.value },
              ))}
            />
          </div>

          <div className={`${base}__grid--item`}>
            <button
              onClick={() => this.onBufferInput({
                event: { key: 'Enter' },
                type: 'custom',
              })}
            >
              Submit
            </button>
          </div>

        </div>

      </div>)
  }
}
