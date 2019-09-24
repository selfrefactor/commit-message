const enzyme = require("enzyme")
const Adapter = require("enzyme-adapter-react-16")

enzyme.configure({ adapter: new Adapter() })

// No need to console.log
// Use console.warn to debug if needed
console.log = () => {}