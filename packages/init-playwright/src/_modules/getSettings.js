const getSettings = (
  input, extraProps, isChrome
) => ({
  ...extraProps,
  ...isChrome ?
    {
      args : [
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
      ],
    } :
    {},
  ignoreHTTPSErrors : true,
  handleSIGINT      : false,
  handleSIGHUP      : false,
  handleSIGTERM     : false,
  headless          : input.headless,
})

exports.getSettings = getSettings
