const { defaultTo } = require('rambda')

const receiveMessage = ({ queue, rqChannel, durable, acknowledge }) =>
  new Promise(resolve => {
    const durableFlag = defaultTo(true, durable)
    const acknowledgeFlag = defaultTo(false, acknowledge)

    rqChannel.assertQueue(queue, { durable : durableFlag })
    rqChannel.consume(queue, message => {
      if (acknowledgeFlag === true){
        rqChannel.ack(message)
      }
      resolve(message)
    })
  })

exports.receiveMessage = receiveMessage
