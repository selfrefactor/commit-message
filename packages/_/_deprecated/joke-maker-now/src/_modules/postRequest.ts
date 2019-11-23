import { Observable } from 'rxjs/Observable'
import axios from 'axios'

export const postRequest = (url, body) => Observable.fromPromise(axios.post(url, body))
