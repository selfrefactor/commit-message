import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { RandomWordComplete } from './complete'

const testInstance = {
  id: 'diesem',
  word: 'diesem',
  translated: 'diesem67890123456789012',
  // word: 'diesem67890123456789012',
  timestamp: 1569679189411,
  exampleSentence: 'Wir wissen nicht genau, wie hoch die Kosten in diesem Jahr dafür ausfallen werden.',
  exampleSentenceTranslated: 'We do not know how much it is going to cost this year.',
}

storiesOf('RandomWord', module)
  .add('with test instance', () => <RandomWordComplete optionsKeyBinding={[ 'alt', 'w' ]} testInstance={testInstance} />)
  .add('complete', () => <RandomWordComplete optionsKeyBinding={[ 'alt', 'w' ]} />)
