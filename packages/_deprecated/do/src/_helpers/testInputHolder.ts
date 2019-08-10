// tslint:disable
export function getTestableModuleInput() {

  return {
    fileName: 'foo',
    folderPath: '',
    inputArguments: 'a,b',
    rootInput: {
      mode: 'REACT',
      srcDirectory: '/home/just/repos/do/demoReact',
      packageJson: '/home/just/repos/do/demoReact/package.json',
    },
    selectedMode: 'JAVASCRIPT_MODULE',
    expectedResult: 3,
    testInput: {
      a: 1,
      b: 2,
    },
  }
}

export function getEpicInput() {
  return {
    folder: 'FOO',
    starterAction: 'see.then',
    name: 'bar.more',
    testable: false,
    rootInput: {
      mode: 'REACT',
      srcDirectory: '/home/just/repos/do/demoReact',
      packageJson: '/home/just/repos/do/demoReact/package.json',
    },
    allComponents: [
      'foo',
      'root',
    ],
    actionsLocation: '/home/just/repos/do/demoReact/foo/actions.ts',
    constantsLocation: '/home/just/repos/do/demoReact/constants.ts',
    epicLocation: '/home/just/repos/do/demoReact/foo/epics/barMoreEpic.ts',
    indexEpicLocation: '/home/just/repos/do/demoReact/foo/epics/index.ts',
    typingsLocation: '/home/just/repos/do/demoReact/typings.d.ts',
    constantName: 'FOO_SEE_THEN',
    constantValue: 'foo@SEE_THEN',
    epicName: 'barMoreEpic',
    actionName: 'FooSeeThenAction',
  }
}

export function getEpicInputWhenOuter() {
  return {
    folder: 'FOO',
    starterAction: 'see.then',
    name: 'bar.more',
    testable: true,
    rootInput: {
      mode: 'REACT',
      srcDirectory: '/home/just/repos/do/demoReact',
      packageJson: '/home/just/repos/do/demoReact/package.json',
    },
    allComponents: [
      'foo',
      'root',
      'see',
    ],
    actionsLocation: '/home/just/repos/do/demoReact/foo/actions.ts',
    constantsLocation: '/home/just/repos/do/demoReact/constants.ts',
    epicLocation: '/home/just/repos/do/demoReact/foo/epics/barMoreEpic.ts',
    indexEpicLocation: '/home/just/repos/do/demoReact/foo/epics/index.ts',
    typingsLocation: '/home/just/repos/do/demoReact/typings.d.ts',
    constantName: 'SEE_THEN',
    constantValue: 'see@THEN',
    epicName: 'barMoreEpic',
    actionName: 'SeeThenAction',
  }

}

export function getComponentInput() {

  return {
    firstEpic: 'init',
    firstEpicStarter: 'init',
    name: 'foo',
    store: {
      initialState: {
        a: 1,
      },
      interfaceProps: [
        'a: number',
      ],
    },
    storeType: 'BOTH',
    styling: 'STYLED',
    actionsLocation: '/home/just/repos/do/demoReact/foo/actions.ts',
    combinedReducersLocation: '/home/just/repos/do/demoReact/root/combinedReducers.ts',
    componentLocation: '/home/just/repos/do/demoReact/foo/component.tsx',
    constantsLocation: '/home/just/repos/do/demoReact/constants.ts',
    epicLocation: '/home/just/repos/do/demoReact/foo/epics/initEpic.ts',
    folderName: 'foo',
    indexEpicLocation: '/home/just/repos/do/demoReact/foo/epics/index.ts',
    indexTsxLocation: '/home/just/repos/do/demoReact/index.tsx',
    lessLocation: '/home/just/repos/do/demoReact/foo/style.less',
    reducersLocation: '/home/just/repos/do/demoReact/foo/reducers.tsx',
    rootEpicLocation: '/home/just/repos/do/demoReact/root/epics/index.ts',
    rootInput: {
      mode: 'REACT',
      srcDirectory: '/home/just/repos/do/demoReact',
      packageJson: '/home/just/repos/do/demoReact/package.json',
    },
    storeName: 'fooStore',
    storeTyping: 'FooStore',
    styledLocation: '/home/just/repos/do/demoReact/foo/styled.tsx',
    typingsLocation: '/home/just/repos/do/demoReact/typings.d.ts',
    localConstantKey: 'FOO_INIT',
    localConstantValue: 'foo@INIT',
    localUsed: true,
    outerConstantKey: 'INIT',
    outerConstantValue: 'INIT',
  }

}
// tslint:enable
