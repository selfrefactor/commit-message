import * as React from 'react';
import { storiesOf } from '@storybook/react';
import {Foo} from './index';

export class Foox extends React.Component{
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
1
      </div>
    )
  }
}

const stories = storiesOf('Components', module);

stories.add(
  'TicTacToeCell',
  () => <Foo />
);