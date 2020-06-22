require('env-fn')('special')
const R = require('rambda')
const { rabbitFn } = require('./src/')

const delay = ms =>
  new Promise(resolve => {
    setTimeout(() => {
      resolve()
    }, ms)
  })

const sortFn = (a, b) => a - b

const debug = async () => {
  try {
    const rabbit = await rabbitFn()
    const results = []
    const sentMessages = []
    rabbit.receiveMessageCallback({
      queue       : 'bar',
      acknowledge : true,
    },
    receivedMessage => {
      console.log('received', receivedMessage.content.toString('utf8'))

      results.push(receivedMessage.content.toString('utf8'))
    })
    for (const _ of R.range(0, 5)){
      const message = `foo${ Math.random() }`
      sentMessages.push(message)
      await rabbit.sendMessage({
        message : message,
        queue   : 'bar',
      })
      console.log('sent', message)
      await delay(200)
    }
    await delay(200)
    const result = R.equals(R.sort(sortFn, results),
      R.sort(sortFn, sentMessages))
    console.log(R.sort(sortFn, results))
    console.log(R.sort(sortFn, sentMessages))
    console.log(result, true)
  } catch (err){
    console.log(err)
  }
}

rabbitFn().then(rabbit => {
  rabbit.receiveMessageCallback({ queue : 'baz' }, x => {
    console.log(rabbit.parse(x))
  })
})

const debugAlt = async () => {
  try {
    const rabbit = await rabbitFn()
    await rabbit.sendMessage({
      message : `foo${ Math.random() }`,
      queue   : 'baz',
    })
    // const receivedMessageRaw = await rabbit.receiveMessage({queue: "baz", acknowledge: true})
    // const receivedMessage = receivedMessageRaw.content.toString("utf8")
    // console.log(rabbit.parse(receivedMessageRaw))
    await delay(4000)
    // debug()
    console.log('done')
  } catch (err){
    console.log(err)
  }
}

debug().then(() => {
  process.exit()
})
