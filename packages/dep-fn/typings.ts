export type Identity<T> = (x: T) => T

export interface GetInfo {
  dependency: string,
  tag: string,
}

export interface StringMap<T> {
  [key: string]: T,
}

export interface Dependencies {
  dependencies: StringMap<string>,
  devDependencies: StringMap<string>,
  peerDependencies: StringMap<string>,
  packageJson: object,
}

export interface GetUpdateQuestion {
  latestTag: string,
  currentTag: string,
  dependency: string,
}

export interface AddDependency {
  url: string,
  dependency: string,
}

export type Composed<T, U> = (input: T) => U
