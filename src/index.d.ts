export interface PromptSelect {
  question: string
  choices: string[]
}

export function commitMessage(): Promise<string>
