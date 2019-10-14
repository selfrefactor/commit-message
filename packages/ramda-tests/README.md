# Ramda tests

Check differences between `Ramda` and `Rambda`

## Steps

- Clone Ramda

`git clone https://github.com/ramda/ramda`

or

`run read https://github.com/ramda/ramda`

- Edit .gitignore so ramda folder is indexable

- Search and replace with VSCode(or other IDE) all occurances of `require('../source')` with `require('rambda')`

- Run `yarn` in `ramda` directory

- Finally run `yarn on` in `ramda-tests` directory