const { commitAndPushFast } = require('commit-fn')

/*
  "--mode", commitMode, "--tag", commitTag, "--message", commitMessage
*/
async function commit(...inputs){
  const [ , commitMode, , commitTag, , commitMessage ] = inputs

  return commitAndPushFast({
    dir : process.cwd(),
    commitMessage: commitMessage.trim(),
    commitMode,
    commitTag,
  })
}

exports.commit = commit
