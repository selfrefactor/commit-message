import React from 'react'
import { shallow } from 'enzyme'
import { Bar } from './component'

test('happy', () => {
  expect(
    shallow(<Bar store={{ counter : 2 }} dispatch={console.log}/>)
  ).toMatchSnapshot()
})
