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
  repoUrl: string
}

export function getRepoData(input: {
  repos: string[],
  cacheLocation: string,
  refreshCache?: boolean
}): Promise<Array<RepoData>>