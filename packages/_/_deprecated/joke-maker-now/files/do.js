const { resolve } = require('path')
const { doModule } = require('do')

doModule({
  mode:'REACT',
  srcDirectory: resolve(__dirname, '../src'),
  packageJson: resolve(__dirname, '../package.json')
}).then(console.log)