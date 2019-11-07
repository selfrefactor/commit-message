const { defaultTo } = require('rambda')

const sendMessage = async ({ queue, message, rqChannel, persistent }) => {
  const persistentFlag = defaultTo(true, persistent)

  await rqChannel.assertQueue(queue, { durable : true })

  const messageToSend = Buffer.from(message, 'utf8')

  rqChannel.sendToQueue(queue, messageToSend, { persistent : persistentFlag })
}

exports.sendMessage = sendMessage
