const {doModule} = require('../../do/lib/index')
const {resolve} = require('path')

doModule({
  mode:'REACT',
  srcDirectory: resolve(__dirname, '../src'),
  packageJson: resolve(__dirname, '../package.json')
})