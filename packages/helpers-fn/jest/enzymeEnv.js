require('env')('special')
const Adapter = require('enzyme-adapter-react-16')
const enzyme = require('enzyme')

enzyme.configure({ adapter : new Adapter() })

global.requestAnimationFrame = function (callback){
  setTimeout(callback, 0)
}
