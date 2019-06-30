import { doModule } from '../../typings.d.ts'
import { createEpic } from './createEpic'

const rootInput: doModule = {
  mode: 'REACT',
  srcDirectory: '/home/just/repos/do/demoReact',
  packageJson: '/home/just/repos/do/demoReact/package.json',
}

const input = {
  rootInput,
  allComponents: [
    'foo',
    'root',
  ],
  actionsLocation: '/home/just/repos/do/demoReact/root/actions.ts',
  constantsLocation: '/home/just/repos/do/demoReact/constants.ts',
  epicLocation: '/home/just/repos/do/demoReact/root/epics/fooEpic.ts',
  indexEpicLocation: '/home/just/repos/do/demoReact/root/epics/index.ts',
  typingsLocation: '/home/just/repos/do/demoReact/typings.d.ts',
  folder: 'ROOT',
  name: 'foo',
  starterAction: 'root.init',
}

test('', async () => {
  const result = await createEpic(input)
  console.log(result)

  expect(
    1,
  ).toEqual(1)
})
