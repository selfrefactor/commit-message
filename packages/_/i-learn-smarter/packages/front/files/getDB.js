require('env')('special')

const { writeJsonSync } = require('fs-extra')
const { path } = require('rambdax')
const axios = require('axios')

const password = process.env.PASSWORD
const urlBase = `https://admin:${password}@${process.env.COUCH_URL_BASE}`

const url = `${urlBase}/db/_all_docs?include_docs=true`

void async function (){
  try {
    const response = await axios.get(url)
    const db = path('data.rows',response).filter(
      x => typeof path('doc.deWord',x) === 'string'
    )

    writeJsonSync(`${__dirname}/db.json`, {rows: db})
  } catch (e) {
    console.log(e)
  }
}()