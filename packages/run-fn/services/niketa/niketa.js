const {NiketaClient} = require('niketa')

function niketa() {
  const niketaClient = new NiketaClient({ port : 3020 })
  console.log('Niketa start')
  niketaClient.start()
}

exports.niketa = niketa
