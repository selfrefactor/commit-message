import ngrokFn from 'ngrok-fn'
const port = Number(process.env.DEV_PORT)

export function ngrokStart() {
  ngrokFn(port)
}
