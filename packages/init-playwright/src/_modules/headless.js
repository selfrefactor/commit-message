function headless(){
  return process.env.PLAYWRIGHT_DEBUG !== 'true'
}

exports.headless = headless
