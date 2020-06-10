const { UNAUTHORIZED } = require('../constants') 
const { exec } = require('./exec') 

function gtmetrixCURL(url) {
    const authPart = `curl --user deyan8284@gmail.com:${process.env.GTMETRIX_API_KEY}`

    const command = `${authPart} --form url=${url} --form x-metrix-adblock=0 https://gtmetrix.com/api/0.1/test`

    const [resultRaw] = await exec({ command, cwd: process.cwd() })

    const result: any = JSON.parse(resultRaw)

    return `${authPart} ${result.poll_state_url}`
}

async function gtmetrix(url){
    if (process.env.GTMETRIX_API_KEY === undefined) {
      throw new Error(UNAUTHORIZED)
    }

    return gtmetrixCURL(url)
}

exports.gtmetrix = gtmetrix