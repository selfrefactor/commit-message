const psiLib = require('psi')
const { parseLighthouse } = require('../parsers/lighthouse')
const { parseLoadingExperience } = require('../parsers/loading-experience')

function parseResponse(input){
  return {
    ...parseLighthouse(input.lighthouseResult),
    loadingExperience       : parseLoadingExperience(input.loadingExperience),
    originLoadingExperience : parseLoadingExperience(input.loadingExperience),
  }
}

async function psi(url){
  const { data } = await psiLib(url)

  return parseResponse(data)
}

exports.psi = psi
