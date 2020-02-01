const {doModule} = require('do')
const {resolve} = require('path')

doModule({
  mode:'REACT',
  srcDirectory: resolve(__dirname, '../src'),
  packageJson: resolve(__dirname, '../package.json')
})