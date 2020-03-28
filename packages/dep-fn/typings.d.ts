import {Page} from 'puppeteer'

type Identity<T> = (x: T) => T

interface InitDependencies {
  page: Page,
  dependencies: object,
}

interface LatestGithubTag {
  page: Page,
  url: string,
}

interface GithubTag {
  page: Page,
  url: string,
  tag: string,
  dependency: string,
}

interface UpdateTag {
  page: Page,
  url: string,
}

interface GetInfo {
  page: Page,
  dependency: string,
  tag: string,
}

interface UpdateDependencies extends GetInfo {
  url: string,
}

interface StringMap<T> {
  [key: string]: T,
}

interface Dependencies {
  dependencies: StringMap<string>,
  devDependencies: StringMap<string>,
  peerDependencies: StringMap<string>,
  packageJson: object,
}

interface GetUpdateQuestion {
  latestTag: string,
  currentTag: string,
  dependency: string,
}

interface AddDependency {
  page: Page,
  url: string,
  dependency: string,
}

type Composed<T, U> = (input: T) => U
