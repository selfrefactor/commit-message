import { remove } from 'rambdax'
const proxyUrl = 'https://toteff.eu.ngrok.io/cors/'

export function convertImageBee(urlRaw){
  const url = remove([
    'https://',
    'http://',
  ], urlRaw)

  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()
    xhr.onload = function(){
      const reader = new FileReader()
      reader.onloadend = function(){
        return resolve(reader.result)
      }
      reader.readAsDataURL(xhr.response)
    }
    xhr.open('GET', proxyUrl + url)
    xhr.responseType = 'blob'
    xhr.send()
  })
}
