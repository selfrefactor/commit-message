import {
  masterGetter,
  masterSetter,
  resetter,
} from 'client-helpers'
import { pick, s } from 'rambdax'
import { takeArguments } from 'string-fn'
import { allowedUrlInputs, resetUrlInputs } from '../constants'

export function rootInitBee(){
  s()
  resetter(resetUrlInputs)
  const urlInputs = pick<any, any>(
    allowedUrlInputs,
    takeArguments(window.location.href),
  )
  const resetChild = urlInputs.adult ?
    {child: false} :
    {}

  masterSetter({
    ...masterGetter(),
    ...urlInputs,
    ...resetChild,
  })
}
