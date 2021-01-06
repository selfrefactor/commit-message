import { getRepoUrl } from './get-repo-url copy'

test('happy', () => {
  const input = '\n    \n\n    \n      brennancheung /\n      prod10x\n        \n    \n    \n      \n        \n        0\n      \n      \n        \n        0\n      \n    \n  '
  const result = getRepoUrl(input)
  const expected = {
    repoUrl : 'brennancheung/prod10x',
    stars   : 0,
  }
  expect(result).toEqual(expected)
})
