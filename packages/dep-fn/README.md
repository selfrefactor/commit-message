# Dep-fn

Convert your NPM dependencies to Github dependencies(where possible)

[![asciicast](https://asciinema.org/a/LWqVVWyZzRlDukRY7aSoDnLAV.png)](https://asciinema.org/a/LWqVVWyZzRlDukRY7aSoDnLAV?speed=3)

## Install

- `yarn global add dep-fn`

After installing the library globally, binary `dep` is exposed. We use the library by running command `dep METHOD_NAME`, where `METHOD_NAME` is one of `init`, `update`, `add` and `revert`.

### Init

Initial conversion of all eligible dependencies to their respective Github tags.

- Run `dep init` from the root of your project.

- Each dependency of `package.json` will be converted to Github tag, if such tag exists.

- New `package.json` file is created with the converted dependencies.

- File `yarn.lock` is deleted(if such file exists).

- Command `yarn install` is pasted in the clipboard.

- Run `yarn install` to apply the changes.

---

For example, let's say we have [rambda](https://github.com/selfrefactor/rambda) as dependency with version `1.0.0`.

`
//package.json
"dependencies": {
  "rambda": "^1.0.0"
}
`

We check NPM info on the package and find its Gitgub repo.

Now we check if there is a tag releases.

If there is release `1.0.0`, then it will be used.

If there isn't, then the latest Github tag will be applied.

The new `package.json`:

`
"dependencies": {
  "rambda": "https://github.com/selfrefactor/rambda#1.0.0"
}
`

### Update

Check if there is possible dependency upgrade.

It works for both standard NPM packages and those already converted to Github tags.

- Run `dep update` from the root of your project.

- Each dependency in `package.json` will be checked for possible upgrade.

- If such upgrade exists, then the user needs to either confirm or reject the change.

- After all dependencies are checked, a new `package.json` is created with converted dependencies.

- File `yarn.lock` is deleted(if such exists).

- Command `yarn install` is pasted in your clipboard.

- Run `yarn install` to apply changes.

> If `process.env.DEP_FN_UPDATE_ALL` is set, then automatically the answer of user prompt becomes `true`.

### Updateall

It updates all dependencies to their latest versions.

You can declare set of dependencies that don't need update in `package.json` like so:

`
{
  ...
  "depFn":[
    "rambda",
    "redux"
  ]
  ...
}
`

### Add

It adds new dependency, as at first it will try to find the respective Github tag.

- Run `dep add PACKAGE_NAME`(for standard dependencies) or `dep add -D PACKAGE_NAME`(for dev dependencies) from the root of your project.

- The dependency source will either be the latest Github tag or the latest NPM version.

- A command of type `yarn add https://github.com/selfrefactor/rambda#1.0.0` or `yarn add PACKAGE_NAME` is pasted in your clipboard.

- Run the command to apply changes.
