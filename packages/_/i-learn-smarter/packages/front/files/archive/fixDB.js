require('env')('special')
const password = process.env.PASSWORD
const url = `https://admin:${password}@${process.env.COUCH_URL_BASE}`
const {replace,delay, mapAsync} = require('rambdax')
const nano = require('nano')(url)
const db = nano.use('db')

async function singleUpdate(doc){
  const newDoc = {
    ...doc.value,
    imageSrc: replace('http:','https:', doc.value.imageSrc)
  }
  await delay(1000)
  const updateResult = await db.insert(newDoc)
  console.log(updateResult)
}

void async function (){
  const {rows} = await db.view('imagefull', 'missing_ssl')
  
  await mapAsync(
    singleUpdate,
    rows,
  )
}()