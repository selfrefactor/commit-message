# rabbit-fn

Rabbit helper library

## Install

`yarn add https://github.com/selfrefactor/rabbit-fn#0.1.0`

## Requirements

- process.env.RABBIT_URL

## Usage

```
const { rabbitFn } = require("rabbit-fn")
const rabbit = await rabbitFn()
rabbit.sendMessage({
  message:"foo",
  queue:"bar"
})
```

## Methods

### sendMessage

```
rabbit.sendMessage({
  message: MESSAGE,
  queue: QUEUE
})
```

### receiveMessage

```
rabbit.receiveMessage({
  message: MESSAGE,
  queue: QUEUE
})
```

### receiveMessageCallback

```
rabbit.receiveMessageCallback({
  queue: QUEUE
}, receivedMessage =>{
  // Stream of messages
})
```

### parse

It converts RabbitMQ message to string

```
const message: string = rabbit.parse(rawMessage)
```