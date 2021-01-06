import { getRepoUrl } from './get-repo-url'

test('happy', () => {
  const input = '\n    \n\n    \n      brennancheung /\n      prod10x\n        \n    \n    \n      \n        \n        0\n      \n      \n        \n        0\n      \n    \n  '
  const result = getRepoUrl(input)
  console.log({ result })
})
