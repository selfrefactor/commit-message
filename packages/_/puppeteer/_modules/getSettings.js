const getSettings = (input, extraProps) => {
  const args = [
    '--no-first-run',
    '--disable-sync',
    '--disable-gpu',
    '--disable-setuid-sandbox',
    '--disable-web-security', 
    '--disable-dev-profile',
    '--mute-audio',
    '--disable-translate',
    '--disable-background-networking',
    '--single-process',
    '--ignore-certificate-errors',
    `--window-size=${ input.resolution.x },${ input.resolution.y }`,
    '--no-sandbox',
    '--shm-size=1G',
  ]

  return {
    ...extraProps,
    args,
    ignoreHTTPSErrors : true,
    handleSIGINT      : false,
    handleSIGHUP      : false,
    handleSIGTERM     : false,
    headless          : false,
  }
}

exports.getSettings = getSettings
