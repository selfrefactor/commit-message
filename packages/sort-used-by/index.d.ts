interface Input {
  repo: string
  isDev?: boolean
  isHuge?: boolean
  pageLimit?: number
}

export function sortUsedBy(
  input: Input
): Promise<Array<{stars: number; repo: string}>>
