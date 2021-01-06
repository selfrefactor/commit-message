import { getRepoData } from './get-repo-data'

test('happy', () => {
  const input = "\n    \n\n    \n      romgrk /\n      web-toolkit\n    \n    \n      \n        \n        17\n      \n      \n        \n        1\n      \n    \n  "
  const result = getRepoData(input)
  const expected = {
    repoUrl : 'romgrk/web-toolkit',
    stars   : 17,
  }
  expect(result).toEqual(expected)
})
