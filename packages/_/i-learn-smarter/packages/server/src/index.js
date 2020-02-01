require('env')('special')
process.on('uncaughtException', err => {
  console.log(err)
})
process.on('unhandledRejection', (reason, promise) => {
  console.log(reason, promise)
})
import 'ejs'
import express from 'express'
import compression from 'compression'
import { createServer } from 'http'
import { allowCrossOrigin } from './_modules/allowCrossOrigin'
import { ngrokStart } from './_modules/ngrokStart'

// EXPRESS INITIAL SETUP
///////////////////////////
const app = express()

app.set('views', __dirname + '/views')
app.set('view engine', 'ejs')

app.use(compression())
app.use(express.json())
app.use(allowCrossOrigin)
app.use(
  express.static(`${__dirname}/public`)
)

app.get('*', (req, res) => {
  res.render('index')
})
// SERVER SETUP
///////////////////////////
const port = process.env.DEV_PORT ?
  Number(process.env.DEV_PORT) :
  Number(process.env.PORT)

app.set('port', port)

const server = createServer(app)
server.listen(port)

server.on('listening', async () => {
  console.log(`start  ${ server.address().port }`)
  if(process.env.NGROK === 'ON'){
    ngrokStart()
  }
})
