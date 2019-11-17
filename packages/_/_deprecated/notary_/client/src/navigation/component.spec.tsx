import { render, shallow } from 'enzyme'
import { identity } from 'rambdax'
import * as React from 'react'
import { Navigation } from './component'

const initialState: Store = {
  navigationActive: false,
}

const CurrentProps: Props = {
  dispatch: identity,
  store: initialState,
}

test('', () => {
  const wrapper = render(<Navigation {...CurrentProps} />)

  expect(wrapper.text()).toEqual('')
})

test('', () => {
  const wrapper = shallow(<Navigation {...CurrentProps} />)

  expect(wrapper).toMatchSnapshot()
})
