export function convertToBase64(url: string) {

  return new Promise(resolve => {
    const xhr = new XMLHttpRequest()

    xhr.onload = () => {
      const reader = new FileReader()
      reader.onloadend = () => {
        resolve(reader.result)
      }
      reader.readAsDataURL(xhr.response)
    }

    xhr.open('GET', url)
    xhr.responseType = 'blob'
    xhr.send()
  })
}
