interface RepoData{
  repoData: {
    full_name: string,
    description: string,
    stargazers_count: number,
    forks_count: number,
    updated_at: string,
    pushed_at: string,
    subscribers_count: string,
    open_issues_count: number
  },
  filterData: {
    pass       : boolean,
    updateDate : undefined | string,
    updateDiff : undefined | string,
  },
  repoUrl: string,
  pushedDiff: number,
  updatedDiff: number,
}

export function getRepoData(input: {
  repos: string[],
  refreshCache?: boolean
  daysLimit?: number
}): Promise<Array<RepoData>>