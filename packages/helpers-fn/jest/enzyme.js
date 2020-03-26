const enzyme = require('enzyme')
const Adapter = require('enzyme-adapter-react-16')

enzyme.configure({ adapter: new Adapter() })

global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
}
