import { shallow } from 'enzyme'
import { identity } from 'rambdax'
import * as React from 'react'
import { getInitialState } from '../../_helpers/getInitialState'
import { Carrier } from './component'

const initialState = getInitialState()

const CurrentProps: Props = {
  dispatch: identity,
  store: initialState,
}

test('renders the message', () => {
  expect(
    shallow(<Carrier {...CurrentProps} />),
  ).toMatchSnapshot()
})
