interface Input{
  repo: string
  title : string
  shouldRefreshScraped?: boolean
  shouldRefreshApi?: boolean
  starsLimit?: number
  outputLocation: string
}
export function buildStarsOf(input: Input): Promise<void>