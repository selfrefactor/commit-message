import { flip, interpolate, join, map, piped } from 'rambdax'

function getIntro(title, repo){
  const template = `
# {{title}}

This list contains Github repos depending on **{{repo}}**. 

These repos are sorted by their stars and thier \`package.json\` is updated in the last year.

> This list is created with \`build-stars-of\` library.
  `.trim()

  return interpolate(template, {
    title,
    repo,
  })
}

function getMainContent(data){
  const template = `
## {{name}}

{{description}}

[{{name}}](https://github.com/{{name}}) - 🌟 {{stars}}
  `.trim()

  const templateNoDescription = `
## {{name}}

[{{name}}](https://github.com/{{name}}) - 🌟 {{stars}}
  `.trim()

  const allMethods = piped(
    data,
    map(({ repoData: x }) =>
      interpolate(x.description ? template: templateNoDescription, {
        name        : x.full_name,
        description : x.description,
        stars       : x.stargazers_count,
      })),
    join('\n\n')
  )

  return allMethods
}

export function buildFinalOutput(input){
  const template = `
{{intro}}

{{mainContent}}
  `.trim()
  const intro = getIntro(input.title, input.repo)

  const mainContent = getMainContent(input.data)

  const markdownText = interpolate(template, {intro, mainContent})

  return markdownText
}
