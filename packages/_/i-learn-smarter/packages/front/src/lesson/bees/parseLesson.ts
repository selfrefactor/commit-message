import {
  always,
  filter,
  head,
  ifElse,
  join,
  piped,
  remove,
  split,
  startsWith,
  tail,
  trim,
} from 'rambdax'

const getTitle = x => piped(
  x,
  split('\n'),
  filter(Boolean),
  head,
  remove('#'),
  trim,
)

const getContent = x => piped(
  x,
  split('\n'),
  filter(Boolean),
  tail,
  // Way to restore the empty line taken from the split above
  // ============================================
  join('\n\n'),
  split('\n'),
)

const getExample = x => piped(
  x,
  split('\n'),
  filter(Boolean),
  head,
  trim,
)

const getTranslation = x => piped(
  x,
  split('\n'),
  filter(Boolean),
  filter(startsWith('>')),
  ifElse(
    y => y.length > 0,
    y => remove('> ', head(y)),
    always(''),
  ),
)

const isExample = x => !x.startsWith('# ')

export function parseLessonBee(text: any){
  const parts = text.split('---').map(trim).filter(x => x.length > 2)

  return parts.map(x => {
    const title = isExample(x) ? '' : getTitle(x)

    if (isExample(x)){
      const example = getExample(x)
      const translation = getTranslation(x)
      return {
        title,
        example,
        translation,
      }
    }

    return {
      title,
      text: getContent(x),
    }
  })
}
