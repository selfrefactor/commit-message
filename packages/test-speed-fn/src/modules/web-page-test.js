const opener = require('opener')
const { UNAUTHORIZED } = require('../constants') 
const { exec } = require('./exec') 

async function webPageTest(url) {
    if (process.env.WEBPAGETEST_API_KEY === undefined) {
      throw new Error(UNAUTHORIZED)
    }

    const command = `webpagetest --server=https://www.webpagetest.org/ --key=${process.env.WEBPAGETEST_API_KEY} test ${url}`

    const [resultRaw] = await exec({ command, cwd: process.cwd() })
    const result = JSON.parse(resultRaw)

    opener(`https://www.webpagetest.org/result/${result.data.testId}/`)
}

exports.webPageTest = webPageTest