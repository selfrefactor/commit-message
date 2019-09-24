# Lib-starter

Javascript library seed

## How to install

1. `git clone https://github.com/selfrefactor/lib-starter.git`

2. `rm -rf  lib-starter/.git&&cp -R ./lib-starter/* .&&cp -R lib-starter/.[^.]* .&&rm -rf lib-starter`

3. `yarn`

> To install dependencies

4. `yarn start`

> To start `Parcel` in watch mode

5. `yarn build`

> When you are ready to deploy

6. `yarn test`

> To run `Jest` tests

## What is included

- `Parcel` is used for building and watching

- `index.d.ts` file to declare your typings

- `Babel` is used to make `Jest` work

> If you don't need testing, then feel free to remove `Babel` related dependencies
