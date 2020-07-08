const electron = require('electron')
const expressApp = require('./app')
const http = require('http')
const { BrowserWindow } = electron

let mainWindow

const port = 3002

expressApp.set('port', port)
const server = http.createServer(expressApp)

server.listen(port)
server.on('error', onError)
server.on('listening', () => {
  console.log(`Listening on ${ port }`)
})
const { app } = electron

app.on('ready', createWindow)
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin'){
    app.quit()
  }
})
app.on('activate', () => {
  if (mainWindow === null){
    createWindow()
  }
})

function onError(error){
  if (error.syscall !== 'listen'){
    throw error
  }
  const bind = typeof port === 'string' ? 'Pipe ' + port : 'Port ' + port

  switch (error.code){
  case 'EACCES':
    console.error(bind + ' requires elevated privileges')
    process.exit(1)
    break
  case 'EADDRINUSE':
    console.error(bind + ' is already in use')
    process.exit(1)
    break
  default:
    throw error
  }
}

function createWindow(){
  const { width, height } = electron.screen.getPrimaryDisplay().workAreaSize

  mainWindow = new BrowserWindow({
    width,
    height,
    icon : `${ __dirname }/logo.png`,
  })
  mainWindow.loadURL(`file://${ __dirname }/index.html`)
    // mainWindow.loadURL(`file://${ __dirname }/indexDev.html`)
    // mainWindow.webContents.openDevTools()
  mainWindow.on('closed', () => {
    mainWindow = null
  })
}
