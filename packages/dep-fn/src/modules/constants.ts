import {InputPlaywright} from 'init-playwright'

export const playwrightSettings: InputPlaywright = {
  headless: process.env.DEBUG !== 'true',
  url: 'about:blank',
}
