## hide

If there is marker `// DEV_ONLY`, then this scripts comments out the next line.

```bash
node files/devOnly --hide
```

## show

If there is marker `// DEV_ONLY`, then this scripts comments in the next line.

```bash
node files/devOnly --show
```

## log

Starts `socket.io` server that logs `redux` and standard `console.log` client calls.

```bash
node files/log
```

## lint

Lint current project with `tslint`

```bash
tslint --fix --project tsconfig.json
```

## format

Format current project with `tsfmt`

```bash
tsfmt -r --no-tsconfig src/*.ts
```

## lintx

Lint and format

```bash
maid lint&&maid format
```

## db

Updates current database json with cloud `pouch` database

```bash
node files/getDB
```

## do

Utility for faster component/epic creation

```bash
node files/do
```

## lesson

It creates mardown file with all lessons links

```bash
node files/_modules/generateLessons.js
```

## webpack

Webpack production build

```bash
./node_modules/.bin/webpack --config webpack.config.prod.js
```

## now

```bash
now dist --public
```

## out

Full build pipeline

```bash
maid hide&&maid webpack
```

## build

Full build pipeline

```bash
maid hide&&maid webpack&&node files/postBuild
```

## buildx

Deprecated: Full build pipeline

```bash
node files/seo&&maid hide&&maid webpack&&node files/postBuild
```

## devserver

Dev server

```bash
node_modules/.bin/webpack-dev-server
```

## start

Start working

```bash
maid hide&&maid devserver
```

## startx

Start working and enable `socket.io` sending of the browser's log.

```bash
maid show&&maid devserver
```

## test

Run unit tests

```bash
jest src
```

## e2e

Run e2e tests.
TODO: use `e2e.js` pattern

```bash
jest -c jest.config.json files/e2e
```

## watch

Lint and format files upon file change.
In fact it waits for change of `currentPathHolder` to start linting.

```bash
node files/watch
```

## lessons

Generate `LESSONS.md` file

```bash
node files/_modules/generateLessons
```

## cram

Generate  Cram export file

```bash
node files/archive/cram
```
