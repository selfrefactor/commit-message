import { testURL } from './index'

const base = 'https://helpkarma.com'

async function debug() {
  const result = await testURL(base)
  console.log(result)
}

debug()
