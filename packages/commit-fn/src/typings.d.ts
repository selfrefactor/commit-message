interface PromptSelect {
  question: string,
  choices: string[],
  default: string,
}

interface CommitType {
  key: string,
  value: string,
  explanation: string,
}

interface Label {
  explanation: string,
  belongsTo: CommitType[],
  value: string,
}

interface CommitType {
  key: string,
  value: string,
  explanation: string,
}

interface GetLabel {
  commitType: CommitType,
  labels: Label[],
}
