import { GetUpdateQuestion } from '../../../typings'

export const getUpdateQuestion = (input: GetUpdateQuestion) => {

  return `Update dependency '${input.dependency}' from
'${input.currentTag}' to '${input.latestTag}' ?`
}
