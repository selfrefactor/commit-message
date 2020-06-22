const rqLib = require('amqplib')
const { defaultTo, partialCurry } = require('rambda')
const { parse } = require('./parse')
const { receiveMessage } = require('./receiveMessage')
const { sendMessage } = require('./sendMessage')

async function rabbitFn(optionalRabbitURL){
  const rabbitURL = defaultTo(process.env.RABBIT_URL, optionalRabbitURL)
  const rqConnection = await rqLib.connect(rabbitURL)
  const rqChannel = await rqConnection.createChannel({ durable : true })

  function receiveMessageCallback({ queue, durable, acknowledge },
    callback){
    const durableFlag = defaultTo(true, durable)
    const acknowledgeFlag = defaultTo(true, acknowledge)

    rqChannel.assertQueue(queue, { durable : durableFlag })
    rqChannel.consume(queue, message => {
      if (acknowledgeFlag === true){
        rqChannel.ack(message)
      }
      callback(message)
    })
  }

  return {
    channel                : rqChannel,
    sendMessage            : partialCurry(sendMessage, { rqChannel }),
    receiveMessage         : partialCurry(receiveMessage, { rqChannel }),
    receiveMessageCallback : receiveMessageCallback,
    parse                  : parse,
  }
}

exports.rabbitFn = rabbitFn
