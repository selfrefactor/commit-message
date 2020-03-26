const { defaultTo, maybe } = require('rambdax')
const { exec } = require('./exec')
const TRANSLATE_PORT = defaultTo(3085, Number(process.env.TRANSLATE_PORT))

function translate(mode){
  return text =>
    new Promise(resolve => {
      const appendToRoute = maybe(
        mode === 'default',
        '',
        mode === 'to.bulgarian' ? '-to-bulgarian' : '-to-german'
      )
      const url = `http://127.0.0.1:${ TRANSLATE_PORT }/translate${ appendToRoute }`
      const command = `curl ${ url } -d "text=${ text }"`

      exec({
        cwd   : __dirname,
        command,
        onLog : resolve,
      })
        .then(() => {})
        .catch(() => resolve('in error'))
    })
}

exports.translate = translate('default')
exports.translateToBulgarian = translate('to.bulgarian')
exports.translateToGerman = translate('to.german')
