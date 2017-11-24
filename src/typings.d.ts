export interface PromptSelect {
  question: string
  choices: string[]
  default: string
}

export function commitMessage(): Promise<string>

export interface CommitType {
  key: string
  value: string
  explanation: string
  needsLabel: boolean
}
