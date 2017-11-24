# Commit-message
Standardized commit message generation

## Argumentation

Writing commit messages should benefit of automated assistance. 

While the rules of this library are not perfect, it still helps writing commit messages with consistent style.

## How it works?

The library uses `Inquirer` to take text or choice from the user. Generating the message includes the following steps:

- STEP 1 - Choosing the type of the commit

The user can select one among `'feat','fix', 'test', 'chore', 'refactor', 'doc', 'typing'`.

Default choice is `'feat'`

- STEP 2 - Choosing the label of the commit

If the type of the commit is one of `'feat','fix', 'test'`, then the user can select a label.

The label is one of `'','start','end','perf','UI','style','important'`

Default choice is empty string`''`

- STEP 3 - Writing the commit message

In this step the user writes the actual commit message.

## Install

`yarn add https://github.com/selfrefactor/commit-message#0.1.0`

## Usage

```
import { commitMessage } from 'commit-message'

commitMessage().then((commitMessageValue: string) => {
  console.log(commitMessageValue)
  //=> 'feat@UI: use animation when logout'
})
```

## TODO

- Improve labels set

- Add example property to 'CommitMessage' type to show while typing actual commit message

- Cache latest feature, bug or test message to reuse next time

- Each type has separate set of labels