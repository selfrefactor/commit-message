# Init-playwright

It starts a `Playwright` instance and attaches multiple helpers to it.

## Install

`yarn add init-playwright`

## Issues

### Playwright upgrades

Remove `node_modules` folder

### Webkit

It doesn't work on Manjaro

### Mobile emulation

- Without correct wait condition, the test won't finish and may even not work(github.com is such example)

- It doesn't work on Firefox
