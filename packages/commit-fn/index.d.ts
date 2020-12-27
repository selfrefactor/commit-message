interface CommitMessage {
  dir: string,
  commitMessage: string,
  commitMode: string,
  commitTag: string,
}

export function commitAndPush(cwd: string): Promise<void>
export function commitAndPushFast(input: CommitMessage): Promise<void>
export function commitMessage(cwd: string): Promise<string>