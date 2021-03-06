interface RepoData {
  repoData: {
    full_name: string
    description: string
    stargazers_count: number
    forks_count: number
    updated_at: string
    pushed_at: string
    subscribers_count: string
    open_issues_count: number
  }
  filterData: {
    pass: boolean
    updateDate: undefined | string
    updateDiff: undefined | string
  }
  repoUrl: string
  pushedDiff: number
  updatedDiff: number
}

interface Input {
  repo: string
  title: string
  shouldRefreshScraped?: boolean
  shouldRefreshApi?: boolean
  starsLimit?: number
  daysLimit?: number
  scrapeDeep?: boolean
  showProgress?: boolean
  isDev?: boolean
  isHuge?: boolean
  blacklist?: string[]
  maxScrapeDepth?: number
  outputLocation: string
}
export function buildStarsOf(input: Input): Promise<Array<RepoData>>
