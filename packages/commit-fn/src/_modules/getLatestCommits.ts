import {exec} from 'helpers'
import {all} from 'rambda'
import {readFileSync} from 'fs'

const nonCommitPrefixes = ['commit', 'Author:', 'Date:']

const COMMITS_OUTPUT = `${__dirname}/commits.txt`

export async function getLatestCommits(dir: string): Promise<string[]> {
  await exec({
    command: `git log -3 > ${COMMITS_OUTPUT}`,
    onLog: () => {},
    cwd: dir,
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

  return latestCommits
}
