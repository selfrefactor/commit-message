function defaultTo(processEnvKey, defaultValue, mode = 'default') {
  const processEnvValue = process.env[processEnvKey]
  if(!processEnvValue) return defaultValue

  if(mode === 'default'){
    return processEnvValue
  }
  if(mode === 'number'){
    return Number(processEnvValue)
  }
  if(mode === 'onoff'){
    return defaultValue ? processEnvValue !== 'OFF' : processEnvValue === 'ON'
  }

  return processEnvValue
}

exports.defaultTo = defaultTo