const db = require('proud-db')
const express = require('express')
const fs = require('fs')
const path = require('path')
const router = express.Router()
const fsExtra = require('fs-extra')
const bookmarksFolder = '/home/s/Music/Bookmarks'

const move = ({ source, destination }) =>
  new Promise((resolve, reject) => {
    fsExtra.copy(source, destination, err => {
      if (err) reject(err)
      resolve(true)
    })
  })

let directoryPathHolder

router.post('/move', (req, res) => {
  const source = `${ directoryPathHolder }/${ req.body.song }`
  const destination = `${ bookmarksFolder }/${ req.body.song }`
  move({
    source,
    destination,
  })
    .then(() => {
      res.send('true')
    })
    .catch(err => {
      console.log(err)
      res.send('false')
    })
})

router.get('/file/:name', (req, res) => {
  const options = {
    root     : directoryPathHolder,
    dotfiles : 'deny',
    headers  : {
      'x-timestamp' : Date.now(),
      'x-sent'      : true,
    },
  }
  const fileName = req.params.name
  console.log({ fileName })
  res.sendFile(fileName, options, err => {
    if (err){
      console.log(err)
      res.status(err.status).end()
    } else {
      console.log('Sent:', fileName)
    }
  })
})

router.get('/files', (req, res) => {
  db.loadParent('directoryPath').then(directoryPath => {
    if (directoryPath === undefined){
      res.send(false)
    } else {
      directoryPathHolder = directoryPath
      fs.readdir(directoryPath, (err, files) => {
        if (err !== null){
          res.send(false)
        } else {
          res.send(files)
        }
      })
    }
  })
})
router.post('/setDirectoryPath', (req, res) => {
  db.saveParent('directoryPath', req.body.directoryPath).then(incoming => {
    res.send(incoming)
  })
})
router.post('/save-settings', (req, res) => {
  db.saveParent('settings', req.body.data).then(result => {
    res.send(result)
  })
})
router.get('/load-settings', (req, res) => {
  db.loadParent('settings', req.body.data).then(result => {
    res.send(result)
  })
})

module.exports = router
