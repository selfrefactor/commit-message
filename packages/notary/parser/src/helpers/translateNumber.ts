import { last } from 'rambdax'
const conversionSingleDigit = [
  '',
  'едно',
  'две',
  'три',
  'четири',
  'пет',
  'шест',
  'седем',
  'осем',
  'девет',
]
const conversionTeens = [
  'десет',
  'единадесет',
  'дванадесет',
  'тринадесет',
  'четеринадесет',
  'петнадесет',
  'шестнадесет',
  'седемнадесет',
  'осемнадесет',
  'деветнадесет',
]

const conversionDecimal = [
  '',
  '',
  'двадесет',
  'тридесет',
  'четеридесет',
  'петдесет',
  'шестдесет',
  'седемдесет',
  'осемдесет',
  'деветдесет',
]

const conversionHundred = [
  '',
  'сто',
  'двеста',
  'триста',
  'четеристотин',
  'петстотин',
  'шестстотин',
  'седемстотин',
  'осемстотин',
  'деветстотин',
]

export function translateNumber(input: string|number): string{
  if(typeof input === 'string'){

    return '______'
  }
  const list = `${input}`.split('')
  const len = list.length
  let teenFlag = false
  let andFlag = ''
  let hundred = ''
  let decimal = ''
  let singleDigit = ''

  list.forEach((char, index)=> {
    const diff = len - index
    if(diff === 3){
      hundred = conversionHundred[Number(char)]
    }
    if(diff === 2 && char !== '1'){
      decimal = conversionDecimal[Number(char)]
    }
    
    if(diff === 2 && char === '1'){
      teenFlag = true
      decimal = conversionTeens[Number(last(list))] 
    }
    
    if(diff === 1 && !teenFlag){
      singleDigit = conversionSingleDigit[Number(char)] 
    }
  })

  if(len === 3 && decimal === '' && singleDigit === ''){
    return hundred
  }

  if(len === 3 && decimal === ''){
    return `${hundred} и ${singleDigit}` 
  }
  
  if(len === 3 && teenFlag){
    return `${hundred} и ${decimal}` 
  }
  
  if(len === 3){
    return `${hundred} ${decimal} и ${singleDigit}` 
  }
  
  if(len === 2 && (teenFlag || singleDigit === '') ){
    return decimal
  }
  
  if(len === 2){
    return `${decimal} и ${singleDigit}` 
  }
  
  return singleDigit
}