import { delay , random } from 'rambdax'
import React from 'react'
import axios from 'axios'
const PASSWORD = 'PASSWORD'
export const API_URL_LOCAL = 'http://localhost:3010'
export const API_URL_NGROK = 'https://toteff.eu.ngrok.io'

function WhenData(data){

  const Els = data.data.map((word,i)=>(
    <div 
    className='foo'
    key={`data-${i}`}>
      {word}
    </div>
  ))

  return <div className='container'>
  {Els}
  </div>
}

export class App extends React.Component{
  constructor(props) {
    super(props)
    this.state ={
      ready: false,
      data:[]
    }
    this.work = this.work.bind(this)
  }
  async work(password){
    const ms = random(40, 90) * 1000

    const getData = async () => {
      const {data} = await axios.post(
        `${API_URL_NGROK}/joke-maker`,
        { token: password}
        )
      
      return data  
    }
    const initData = await getData()
    this.setState({ready: true, data: initData})

    while(true){
      await delay(ms)
      const data = await getData()
      this.setState({data})
    }
  }

  componentDidMount(){
    const password = localStorage.getItem(PASSWORD) ?
  localStorage.getItem(PASSWORD) :
  prompt(PASSWORD)

  if(!password) throw PASSWORD

  if(!localStorage.getItem(PASSWORD)){
    localStorage.setItem(PASSWORD, password)
  }

  this.work(password)
  }

  render() {
    if(!this.state.ready) return <div/>

    return <WhenData data={this.state.data}/>
  }
}
