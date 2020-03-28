const getSettings = (input, extraProps) => {
  const chromiumArguments = [
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
  if (input.fullScreen){
    chromiumArguments.push('--start-fullscreen')
  }

  return {
    ...extraProps,
    args              : chromiumArguments,
    ignoreHTTPSErrors : true,
    handleSIGINT      : false,
    handleSIGHUP      : false,
    handleSIGTERM     : false,
    headless          : input.headless,
  }
}

exports.getSettings = getSettings
