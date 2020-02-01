import { serverRequest } from '../bees/serverRequest'

export const googleTranslate = async (text) => {
  const result = await serverRequest({
    route: 'translate',
    payload: {text}
  })

  return result
}
