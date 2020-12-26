interface RepoData{
  repoData: {
    full_name: string,
    description: string,
    stargazers_count: number,
    forks_count: number,
    open_issues_count: number
  },
  repoUrl: string
}

export function getRepoData(repos: string[]): Promise<Array<RepoData>>