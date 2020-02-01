import axios from 'axios'
interface Input{
  route: string
  payload: object
}

const password = localStorage.getItem('ADMIN_PASSWORD')
const url = 'http://localhost:3060'

export async function serverRequest(input: Input){
  const {data: resposeData}= await axios.post(
    `${url}/${input.route}`,
    {...input.payload, password}
  )
  return resposeData
}