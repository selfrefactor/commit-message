import { interpolate } from "rambdax"

function getIntro(title, repo){
  const template = `
# {{title}}

This list contains Github repos depending on **{{repo}}**. 

These repos are sorted by their stars and thier \`package.json\` is updated in the last year.

> This list is created with \`build-stars-of\` library.
  `.trim()

  return interpolate(template, {title, repo})
}

export function buildFinalOutput(input){
  const intro = getIntro(input.title, input.repo)

  return intro
}