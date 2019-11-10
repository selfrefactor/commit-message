# Rx-starter

Typescript, Webpack, React, Redux-observable boilerplate

## TODO

Create connected epic

> Its input is other already created epic

## Usage

Run the commands from a project root directory.

1. `git clone https://github.com/selfrefactor/rx-starter.git`

2. `rm -rf  rx-starter/.git&&cp -R ./rx-starter/* .&&cp -R rx-starter/.[^.]* .&&rm -rf rx-starter`

3. Install with `yarn install` 

## Add epic CLI helper

- run `yarn epic NAME_OF_FOLDER NAME_OF_EPIC`

- `NAME_OF_EPIC` is dot case

- Example `yarn epic admin_panel data.ready`

## Commands 

- `node files/watch` to start the watcher process.

- `yarn run dll` to build vendor development file.

- `yarn start` to start the webpack dev server.

- `yarn run build` to build files for production.

- 'yarn test` to run unit tests 

- 'yarn e2e` to run end-to-end tests(All e2e tests must be named `e2e.spec.ts`)

- `yarn clean` will remove test settings in case that you don't want to test. You need to follow up with `yarn install` as dependencies are changed.

## Adding new component `foo`

- Edit `src/root/epics/index.ts` and include `src/foo/epics/index.ts`