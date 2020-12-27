const { commitAndPushFast } = require('commit-fn')

/*
  "--mode", commitMode, "--tag", commitTag, "--message", commitMessage
*/
async function commit(...inputs){
  const [ , commitMode, , commitTag, , commitMessage ] = inputs

  console.log({
    dir: process.cwd(),
    commitMode,
    commitTag,
    commitMessage,
  })

  return commitAndPushFast({
    dir           : process.cwd(),
    commitMessage : commitMessage.trim(),
    commitMode    : commitMode.trim(),
    commitTag     : commitTag.trim(),
  })
}

exports.commit = commit
