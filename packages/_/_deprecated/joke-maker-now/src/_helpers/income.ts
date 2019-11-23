interface Income{
  defaultValue: object
  url?: string
}

const DELIMITER = '|'
const PROP_DELIMITER = '='

export function income(input: Income): any{
  const url = input.url ? input.url : window.location.href 
  const [, cleaner] = url.split('//')
  const [, args] = cleaner.split('?')

  if(args === undefined || !args.includes(PROP_DELIMITER)){

    return input.defaultValue
  }

  const hash = {}
  args
    .split(DELIMITER)
    .forEach(_ => {
      const [prop, value] = _.split(PROP_DELIMITER)
      hash[prop] = value
    })

  return hash  
}