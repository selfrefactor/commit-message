const { testGTMetrix, testPSI } = require('./test-speed-fn') 

const url = 'https://bg.helpkarma.com'

void async function debug() {
  await testPSI(url)
}()
