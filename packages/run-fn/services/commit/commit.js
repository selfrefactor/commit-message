const { commitAndPushFast } = require('commit-fn')

/*
  "--mode", commitMode, "--tag", commitTag, "--message", commitMessage
*/
async function commit(...inputs){
  const [ , commitMode, , commitTag, , ...commitMessageWords ] = inputs

  const commitMessage = commitMessageWords.join(' ').trim()

  console.log({
    inputs,
    commitMessageWords,
    dir : process.cwd(),
    commitMode,
    commitTag,
    commitMessage,
  })

  return commitAndPushFast({
    dir : process.cwd(),
    commitMessage,
    commitMode,
    commitTag,
  })
}

exports.commit = commit
