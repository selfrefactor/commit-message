import axios from 'axios'

type Operation = 'read' |
'reduce' |
'readSet' |
'loadKeys' |
'removeSet' |
'create' |
'remove' |
'update'

interface Input{
  operation: Operation
  reduceMode?: string
  id?: string
  data?: any
  label: string
}

const password = localStorage.getItem('ADMIN_PASSWORD')
const url = 'http://localhost:3060/db'

export async function dbRequest(input: Input){
  const {data: resposeData}= await axios.post(
    `${url}/${input.label}`,
    {...input, password}
  )
  return resposeData
}