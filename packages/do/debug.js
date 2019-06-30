const { doModule } = require('./dist/')
const { resolve } = require('path')

doModule({
  mode         : 'NODE',
  srcDirectory : resolve(__dirname, '../demoNode'),
}).then(console.log)

//doModule({
//mode:'REACT',
//srcDirectory: resolve(__dirname, '../demoReact'),
//packageJson: resolve(__dirname, '../demoReact/package.json')
//}).then(console.log)

//doModule({
//mode:'ALL',
//srcDirectory: resolve(__dirname, '../demoReact'),
//packageJson: resolve(__dirname, '../demoReact/package.json')
//}).then(console.log)
