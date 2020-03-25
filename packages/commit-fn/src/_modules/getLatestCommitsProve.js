const {exec} = require('helpers')
const {all} = require('rambda')
const {readFileSync} = require('fs')

const exampleDir = '/home/s/repos/rambdax'

const nonCommitPrefixes = ['commit', 'Author:', 'Date:']
const COMMITS_OUTPUT = `${__dirname}/commits.txt`
async function getLatestCommits(exampleDir) {
  await exec({
    command: `git log -4 > ${COMMITS_OUTPUT}`,
    onLog: () => {},
    cwd: exampleDir,
  })
  const latestCommitsRaw = readFileSync(COMMITS_OUTPUT).toString()
  const latestCommits = latestCommitsRaw
    .split('\n')
    .filter(line =>
      all(prefix => !line.startsWith(prefix), nonCommitPrefixes)
    )
    .filter(Boolean)
    .map(x => x.trim())
    .reverse()

  console.log(latestCommits)
}

getLatestCommits(exampleDir)
