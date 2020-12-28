interface Input{
  repo: string
  title : string
  shouldRefreshScraped?: boolean
  shouldRefreshApi?: boolean
  outputLocation: string
}
export function buildStarsOf(input: Input): Promise<void>