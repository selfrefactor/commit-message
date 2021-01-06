interface Input{
  repo: string
  isDev?: boolean
  isHuge?: boolean
}

export function sortUsedBy(input: Input): Promise<Array<{stars: number, repo: string}>>