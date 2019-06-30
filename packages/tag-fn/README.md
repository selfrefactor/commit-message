[![CircleCI](https://img.shields.io/circleci/project/github/selfrefactor/tag-fn.svg)](https://circleci.com/gh/selfrefactor/tag-fn)
[![Codecov](https://img.shields.io/codecov/c/github/selfrefactor/tag-fn.svg)](https://codecov.io/gh/selfrefactor/tag-fn) 

# Tag-fn

CLI command to create Github tags for your repos

## Argumentation

Setting tags in Github is not hard, but it seems like something that could be automated as we need to use the UI for that. 

## How it works

`Tag-fn` uses `Puppeteer` library to log in your Github account and generate a new tag `0.2.0` for the repo where the command `tag 0.2.0` is executed. 

If no argument is passed, then it will automatically generate minor tag release.

In other words, if the current tag is `0.1.0` and command `tag` is executed, then this will result in automatic generation of `0.2.0` tag.

## Initialization

- Install

`yarn global add tag-fn`

- Setting credentials

As `Tag-fn` uses `Puppeteer` library, this means that the library needs information about your Github username and password. Feel free to explore the code of `Tag-fn` to ensure that this sensitive data is not at risk.

One option is set Github credentials is to set `GITHUB_USER` and `GITHUB_PASSWORD` as your enviroinment variables.

The other possibility is to run once the command `tag init` and fill the form with your Github credentials.  

## How to use?

Command is of type `tag ${tagValue}`

- `tagValue` is optional.

- If `tagValue` is omitted, then default value of `minor` will be applied.

- If there is no previous tag, then the new tag will be `0.1.0`(if `tagValue` is `minor`). If you run `tag patch`, then the published tag will be `0.0.1`.

- `tagValue` can be just a text like `foo`.

- `tagValue` can either specify explicit version(`tag 4.2.0`) or be one of `major`, `minor` and `patch`.

### when tagValue === 'patch'

Current tag: `0.2.2`
New tag: `0.2.3`

Current tag: `0.2.9`
New tag: `0.3.0`

### when tagValue === 'minor'

Current tag: `0.2.2`
New tag: `0.3.0`

Current tag: `0.9.2`
New tag: `1.0.0`

### when tagValue === 'major'

Current tag: `0.2.2`
New tag: `1.0.0`

### Additional info

- You can run the command in the project root folder or any project subfolder.

- It makes sense to have a clean repo state before running the `tag` command. 