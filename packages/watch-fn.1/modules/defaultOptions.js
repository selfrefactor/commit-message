const path = require("path")
const defaultLogFn = require("./defaultLogFn")

const defaultOptions = {
  cwd:path.resolve(__dirname,"../../../"),
  directory: path.resolve(__dirname,"../../../src"),
  commands:{
    "js":"echo filepath",
  },
  blurCommands:{
    "js": filePath => console.log(`${filePath} is out of focus`)
  },
  onDelete: filePath => console.log(`${filePath} is deleted`),
  logFn:defaultLogFn,
  sane:{
    dot: false,
    poll: true,
    watchman: false,
  },
  negativeMatches:[
    ".git",
    "temp",
    "public",
    "dist",
    "build",
    "node_modules"
  ],
  timeout:4000,
  exitFlag: true
}

module.exports = defaultOptions
