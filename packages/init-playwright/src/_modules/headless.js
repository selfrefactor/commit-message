function headless(){
  return process.env.PUPPETEER_DEBUG !== 'true'
}

exports.headless = headless
