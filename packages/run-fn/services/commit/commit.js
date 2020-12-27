const { commitAndPushFast } = require('commit-fn')

/*
  commitTag is SKIP if is used as commit message
  "--mode", commitMode, "--tag", commitTag, "--message", commitMessage
*/
async function commit(...inputs){
  const [ , commitMode, , commitTag, , commitMessage ] = inputs
  const hasTag = commitTag !== 'SKIP'

  return commitAndPushFast({
    dir           : process.cwd(),
    commitMessage : commitMessage.trim(),
    commitMode,
    commitTag     : hasTag ? commitTag.trim() : '',
  })
}

exports.commit = commit
