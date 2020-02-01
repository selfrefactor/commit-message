import { repeat, uuid, head } from 'rambdax'
import * as React from 'react'
import { storiesOf } from '@storybook/react'
import { SpeedReaderComplete } from './complete'
import { SpeedReader } from './component'

function storyFactory(len){
  return () => {
    const testString = repeat(
      head(uuid()),
      len
    ).join``

    return (<SpeedReader
      index={ 1 } startIndex={ 100 }
      testString={testString}
    />)
  }
}

storiesOf('SpeedReader', module)
  .add('complete', () => <SpeedReaderComplete optionsKeyBinding={[ 'alt', 'r' ]} />)
  .add('50', storyFactory(50))
  .add('26', storyFactory(26))
  .add('24', storyFactory(24))
  .add('21', storyFactory(21))
  .add('18', storyFactory(18))
  .add('17', storyFactory(17))
  .add('16', storyFactory(16))
  .add('15', storyFactory(15))
  .add('14', storyFactory(14))
  .add('13', storyFactory(13))
  .add('12', storyFactory(12))
  .add('9', storyFactory(9))
  .add('8', storyFactory(8))
  .add('7', storyFactory(7))
  .add('6', storyFactory(6))
  .add('5', storyFactory(5))
  .add('4', storyFactory(4))
  .add('3', storyFactory(3))
  .add('2', storyFactory(2))
  .add('1', storyFactory(1))
