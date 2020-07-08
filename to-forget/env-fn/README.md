# Env-fn

Load .env configuration

## Usage

```
require("env-fn")()

require("env-fn")(".env")
require("env-fn")("special")
```

## Typing

`require("env-rn")(fileName: string)`

Searches for `fileName` starting from `process.cwd` directory and moving up.

If it finds it, it loads environment variables in the process.

Only the first request load variables; the following calls do nothing.

## Default value

- fileName - `.env`

## Pin to different directory

Default directory is `process.cwd()`
To apply local directory as start point use 'dirname' as argument, which is upgrade upon `special` behaviour.

## Forbid use through env flag

If your `process.env.ENV_FLAG` is different than `undefined` or `'true'`, then no environment variables will be loaded with this library.
