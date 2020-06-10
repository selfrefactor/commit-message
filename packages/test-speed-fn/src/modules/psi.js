const psiLib = require('psi')
const { outputJson } = require('fs-extra')

function parseLoadingExperience(loadingExperience){
  console.log({
    loadingExperience,
    FIRST_CONTENTFUL_PAINT_MS :
      loadingExperience.metrics.FIRST_CONTENTFUL_PAINT_MS,
    CUMULATIVE_LAYOUT_SHIFT_SCORE :
      loadingExperience.metrics.CUMULATIVE_LAYOUT_SHIFT_SCORE,
    FIRST_INPUT_DELAY_MS        : loadingExperience.metrics.FIRST_INPUT_DELAY_MS,
    LARGEST_CONTENTFUL_PAINT_MS :
      loadingExperience.metrics.LARGEST_CONTENTFUL_PAINT_MS,
  })
}

function parseResponse(input){
  parseLoadingExperience(input.loadingExperience)
  parseLoadingExperience(input.originLoadingExperience)

  // console.log({
  //   audits: input.lighthouseResult.audits,
  //   metrics: input.lighthouseResult.audits.metrics,
  //   diagnostics: input.lighthouseResult.audits.diagnostics,
  //   interactive: input.lighthouseResult.audits.interactive,
  //   ['first-contentful-paint']: input.lighthouseResult.audits['first-contentful-paint'],
  //   ['network-requests']: input.lighthouseResult.audits['network-requests'],
  //   ['resource-summary']: input.lighthouseResult.audits['resource-summary'],
  //   ['third-party-summary']: input.lighthouseResult.audits['third-party-summary'],
  //   ['unused-javascript']: input.lighthouseResult.audits['unused-javascript'],
  //   ['speed-index']: input.lighthouseResult.audits['speed-index'],
  //   ['user-timings']: input.lighthouseResult.audits['user-timings'],
  //   ['first-meaningful-paint']: input.lighthouseResult.audits['first-meaningful-paint'],
  //   timing: input.lighthouseResult.timing.total
  // })
}

async function psi(url){
  const { data } = await psiLib(url)
  await outputJson(
    `${ __dirname }/result.json`, data, { spaces : 2 }
  )

  // const result= parseResponse(data)
}

exports.psi = psi
