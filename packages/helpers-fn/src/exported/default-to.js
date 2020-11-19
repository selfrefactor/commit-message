const MODES = [
  'default',
  'number',
  'onoff',
  'offon',
]

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
    return processEnvValue !== 'OFF'
  }
  if(mode === 'offon'){
    return processEnvValue !== 'ON'
  }

  return processEnvValue
}