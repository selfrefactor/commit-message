
[![CircleCI](https://img.shields.io/circleci/project/github/selfrefactor/node-starter.svg)](https://circleci.com/gh/selfrefactor/node-starter)
[![Codecov](https://img.shields.io/codecov/c/github/selfrefactor/node-starter.svg)](https://codecov.io/gh/selfrefactor/node-starter)

# Node-starter
Typescript starter boilerplate for creation of Node.js library

## How to install

Run the commands from a project root directory.

1. `git clone https://github.com/selfrefactor/node-starter.git`

2. `rm -rf  node-starter/.git&&cp -R ./node-starter/* .&&cp -R node-starter/.[^.]* .&&rm -rf node-starter`

## What is included?

- Watching `.ts` files in `./src` and `./__tests__` directories

- Tslinting with `fix` flag upon `.ts` file change

- Typescript build upon stopping of file watcher process

- Integration with `Jest`

- Sample files and type definitions

## More detailed information

- Start with cloning the repo and running `yarn install` followed by `yarn start`.

- When you stop the above process, `./dist` folder is deleted and command `tsc -p .` is executed.

## Additional info
  
- Generated Javascript files are located in `./dist` folder.

- You can run tests with `yarn test`

- You can run coverage with `yarn run cover`

- Main exported file is set to `src/index.ts` as it is meant for use within Typescript projects. If you want to publish this library for wider audience, then you should change it to `./dist/index.js`.

- Recommended editor for this boilerplate is `VSCode` as when running `tslint --fix` with larger files, `Atom` and `WebStorm` have unexpected behavior. 
