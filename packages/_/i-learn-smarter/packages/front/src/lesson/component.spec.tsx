import { shallow } from 'enzyme'
import * as React from 'react'

interface I{
  a: string
}

class Foo extends React.Component<I> {
  public render() {
    return (
      <div>aa{this.props.a}
      </div>
    )
  }
}

const propsBase = {
  a: 'bar',
}

test('', () => {
  expect(
    shallow(<Foo {...propsBase} />),
  ).toMatchSnapshot()
})
