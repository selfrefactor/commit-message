require('env')('special')

const { writeJsonSync } = require('fs-extra')
const axios = require('axios')
const {omit} = require('rambdax')

const password = process.env.PASSWORD
const urlBase = `https://admin:${password}@${process.env.COUCH_URL_BASE}`

const url = `${urlBase}/db/_all_docs?include_docs=true`
// const url = `${urlBase}/draft/_all_docs?include_docs=true`

void async function (){
    const {data} = await axios.get(url)
    const toSave = data.rows.map(
      x => omit('_id,_rev,id,rev,key',x.doc)
    )
    console.log(toSave.length)
    writeJsonSync(`${__dirname}/dbBackup.json`, {db: toSave})
}()