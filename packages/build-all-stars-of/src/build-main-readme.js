const { envFn } = require('env-fn')
envFn('special')
const {
  mapAsync,
  drop,
  split,
  join,
  take,
  piped,
  interpolate,
  prepend,
} = require('rambdax')
const { allModes } = require('./config')
const { existsSync } = require('fs')
const { resolve } = require('path')
const { readFile, writeFile } = require('fs-extra')
const { pascalCase ,kebabCase} = require('string-fn')

void (async function main(){
  const iterator = async prop => {
    const { outputLocation, repo } = allModes[ prop ]
    const [ ,titleRaw ] = repo.split('/')
    const title = pascalCase(titleRaw)
    if(!existsSync(outputLocation)) return {skip:true}
    const content = (await readFile(outputLocation)).toString()
    const preview = piped(
      content,
      split('##'),
      drop(1),
      take(5),
      prepend(`## ${title}\n\n`),
      join('###'),
    )

    return {preview, title, toc: `* [${title}](#${kebabCase(titleRaw)}) `}
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
