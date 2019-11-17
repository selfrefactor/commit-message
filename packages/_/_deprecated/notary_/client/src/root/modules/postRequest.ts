import { Observable } from 'rxjs/Observable'

type PostRequest = (url: string, body: object) => Promise<Response>

const post: PostRequest = async (url, body) => {
  try {
    const response = await (fetch as any)(url, {
      body: JSON.stringify(body),
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      method: 'POST',
    })

    const json = await response.json()
    
    return json
  } catch (error) {
    throw error 
  }
    
}

export const postRequest = (url, body) => Observable.fromPromise(post(url, body))
