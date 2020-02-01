import { type } from 'rambdax'
import * as io from 'socket.io-client'

function toString(input: any){
  const inputType: any = type(input)

  if (inputType === 'String') return input

  if (inputType === 'Null' || inputType === 'Undefined'){

    return inputType
  }

  if (inputType === 'Object' || inputType === 'Array'){

    return JSON.stringify(input, null, 2)
  }

  if (input.toString) return input.toString()

  return inputType
}

const socket = io('http://localhost:4000')
let connected = false

let holder = []
let errorHolder = []

const log = console.log
const error = console.error

console.log = (...input) => {
  log(...input)
  const normalizedInput = input.map(toString)

  if (connected){
    socket.emit('log', ...normalizedInput)
  }else if (holder.length < 5){
    holder.push(normalizedInput)
  }
}

console.error = e => {
  error(e)
  const normalized = JSON.stringify(e, null, 2)

  if (connected){
    socket.emit('log.error', normalized)
  }else if (errorHolder.length < 3){
    errorHolder.push(normalized)
  }
}

socket.on('disconnect', () => {
  connected = false
  holder = []
  errorHolder = []
})

socket.on('connect', () => {
  connected = true

  if (holder.length > 0){
    holder.forEach(input => {
      socket.emit('log', ...input)
    })
  }

  if (errorHolder.length > 0){
    holder.forEach(e => {
      socket.emit('log.error', e)
    })
  }
})
