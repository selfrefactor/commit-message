# Commit-message
Standardized commit message generation

## Argumentation

Writing commit messages should benefit of automated assistance. 

While the rules of this library are not perfect, it still helps writing commit messages with consistent style.

## How it works?

The library uses `Inquirer` to take text or choice from the user. Generating the message includes the following steps:

- STEP 1 - Choosing the type of the commit

The user can select one among:

```
'feat' - Significant change in functionality

'fix' - Fixing an issue

'test' - Writing unit or end-to-end tests for specific feature

'chore' - Update build tasks, lint files or similar(no production code change)

'refactor' - Refactor code without affecting functionality

'docs' - Edit the documentation of the project

'typings' - Change Typescript definitions

```

- STEP 2 - Choosing the label of the commit

User can select empty label, write his own label or use one of the suggested.

Suggested labels depends on the selection in STEP1.

- STEP 3 - Writing the commit message

In this step the user writes the actual commit message.

## Install

`yarn add https://github.com/selfrefactor/commit-message#1.0.0`

## Usage

```
import { commitMessage } from 'commit-message'

commitMessage().then((commitMessageValue: string) => {
  console.log(commitMessageValue)
  //=> 'feat@UI: use animation when logout'
})
```

---

You can also use the `commitAndPush` method, which will take the generated commit message and run the following commands for you:

1. `git add . --all`

2. `git commit -m COMMIT_MESSAGE`

3. `git push`

```
import { commitAndPush } from 'commit-message'

commitAndPush().then((commitMessageValue: string) => {
  console.log(commitMessageValue)
  //=> Pushed with message 'feat@UI: use animation when logout'
})
```

## Custom labels

Add `commitMessage` field in your `package.json` like so:

```
{
  ...
  "commitMessage":{
    "labels":[
      "foo",
      "bar",
      "baz"
    ]
  }
  ...
}
```

Custom labels belong to `feat, fix, test` commit types.

## PR

I am open to suggestions for new labels, so if you have any thought on that, please open an issue or file a PR. 

## TODO

- support format `type(label)` under flag

- list of example commits that should be handled with this library

```
refactor@perf switch to lodash alternative

chore@perf use uglify plugin
````

- support extended custom label settings

```
  "classNames": {
    "labels": [
      "choose-word",
      "navigation",
      "root"
    ],
    "support"[
      "webpack"
    ],
    "docs"[
      "todo",
      "build"
    ]
  },
```

- Prepend custom labels with '- custom label' and append with emoji