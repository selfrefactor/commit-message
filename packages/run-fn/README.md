# Run-fn

Collections of useful CLI functions

## Install

`npm i -g run-fn`

After installation, a binary `run` becomes available for CLI use.

## Commands

### angular

It takes Angular dependencies from the closest `foo` folder on the way up from `process.cwd` and update versions of `${process.cwd}/package.json`.

This way, if `foo` contains `ng new foo` with updated `@angular/cli`, then the new dependencies can be merged to other Angular apps.

### bump

> `run bump minor` would trigger `npm publish minor&&npm publish&&git push`
> `run bump` would trigger `npm publish patch&&npm publish&&git push`

### d/de

> run de
> run d message of commit

It adds all changed files, makes a commit and finally runs `git push`

#### Run `prove` script if found in `package.json`

If developers commits brake the build, who is to blame - the developer or the dev process that allows that?

If `yarn prove` returns error or failing test, then the command stops and doesn't proceed with the commit.

Typical `prove` script:

```
"prove": "jest src --json"
```

### read

> run read [foo]

It runs git clone command and remove `.git` folder
If `foo` is passed the repo will be placed in `foo` folder.

Also if file path contains `to-read` then it will make a commit afterwards.

### read done

> run read done foo

It will move `foo` folder to `_DONE` folder

It clones `selfrefactor` foo repo and removes `.git` folder afterwards.

### Lint file

> run lintfile foo.js

It runs ESLint with fix flag over `foo.js`.

Linting depends on several factors:

- if ends with 'componenent.js' - React lint
- if includes '.spec.js' - Jest lint
- if ends with '.js' - default Javascript lint
- if ends with '.ts' - Run `tslint` command with the settings found in `process.cwd()`

### Lint current folder

> run lintfolder

It lints all the Javascript and Typescript files in the current directory and its subfolders.