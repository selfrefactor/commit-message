const server = require('http').createServer()
const io = require('socket.io')(server)
const { log } = require('log')

let counter = 0

const separator = Array(70).fill('=').join('')

const getTag = () => {
  if(counter === 2){
    counter = 0
  }

  return {
    sepTag: `tag=sep${counter}`,
    logTag: `tag=log${counter}`,
  }
} 

io.on('connection', client => {

  client.on('log', (...input) => {
    const {
      sepTag,
      logTag
    } = getTag()
    
    log(...input, logTag)
    log(separator, sepTag)

    counter++
  })

  client.on('log.error', e => {
    
    console.log(e, 'ERROR')
    log('', 'sepx')
  })
})

server.listen(4000)
