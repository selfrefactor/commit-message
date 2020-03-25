export interface PromptSelect {
  question: string,
  choices: string[],
  default: string,
}

export function commitMessage(): Promise<string>
export function commitAndPush(): Promise<string>

export interface CommitType {
  key: string,
  value: string,
  explanation: string,
}

export interface Label {
  explanation: string,
  belongsTo: CommitType[],
  value: string,
}

export interface CommitType {
  key: string,
  value: string,
  explanation: string,
}

export interface GetLabel {
  commitType: CommitType,
  labels: Label[],
}
