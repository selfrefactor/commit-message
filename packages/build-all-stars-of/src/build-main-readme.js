const { envFn } = require('env-fn')
envFn('special')
const {
  mapAsync,
  drop,
  split,
  join,
  tap,
  take,
  piped,
  interpolate,
  prepend,
} = require('rambdax')
const { allModes } = require('./config')
const { existsSync } = require('fs')
const { resolve } = require('path')
const { readFile, writeFile } = require('fs-extra')
const { pascalCase} = require('string-fn')

void (async function main(){
  const iterator = async prop => {
    const { outputLocation, repo } = allModes[ prop ]
    const [ ,titleRaw ] = repo.split('/')
    const title = pascalCase(titleRaw)
    if(!existsSync(outputLocation)) return {skip:true}
    const content = (await readFile(outputLocation)).toString()
    let total
    const preview = piped(
      content,
      split('##'),
      drop(1),
      tap(list => total = list.length),
      take(5),
      prepend(`## ${title}\n\n`),
      join('###'),
    )

    return {preview, title, toc: `* [${title}](https://github.com/selfrefactor/services/blob/master/packages/all-stars-of/stars-of-${title.toLowerCase()}.md) - list of ${total} repos`}
  }
  const sortedKeys = Object.keys(allModes).sort((a, b) => {
    if (allModes[ a ].priority === allModes[ b ].priority){
      const [ , aTitle ] = allModes[ a ].repo.split('/')
      const [ , bTitle ] = allModes[ b ].repo.split('/')

      return aTitle > bTitle ? 1 : -1
    }

    return allModes[ a ].priority > allModes[ b ].priority ? 1 : -1
  })
  const parsed = await mapAsync(iterator, sortedKeys)
  const filtered = parsed.filter(({skip}) => !skip)

  const template = `
# List with all **Stars of** lists

{{tableOfContents}}

> What follows are the top 5 repos for each of the lists

{{previews}}
`.trim()
  const tableOfContents = filtered.map(({toc}) => toc).join('\n')
  const previews = filtered.map(({preview}) => preview).join('---\n\n')
  const finalContent = interpolate(template, {tableOfContents, previews})

  await writeFile(
    resolve(__dirname, '../../all-stars-of/README.md'),
    finalContent
  )
})()
