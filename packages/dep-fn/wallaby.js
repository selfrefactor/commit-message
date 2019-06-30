module.exports = function(wallaby) {
  return {
    files : [
      {
        pattern    : 'package.json',
        load       : false,
        instrument : false,
      },
      {
        pattern    : 'src/**/*.snap',
        load       : false,
        instrument : false,
      },
      'src/**/*.ts?(x)',
      '!src/**/*.e2e.ts',
      '!src/**/*.spec.ts?(x)',
    ],
    tests : [
      'src/**/*.spec.ts',
    ],
    env : {
      type   : 'node',
      runner : 'node',
    },
    testFramework : 'jest',
    workers       : {
      reload  : true,
      initial : 4,
      regular : 2,
    },
    ignoreFileLoadingDependencyTracking : true,
    slowTestThreshold                   : 500,
    maxConsoleMessagesPerTest           : 100,
    debug                               : true,
    loose                               : true,
    compilers                           : { '**/*.ts?(x)' : wallaby.compilers.typeScript({ typescript : require('typescript') }) },
  }
}
