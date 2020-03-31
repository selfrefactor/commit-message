[![CircleCI](https://img.shields.io/circleci/project/github/selfrefactor/string-fn.svg)](https://circleci.com/gh/selfrefactor/string-fn)
[![codecov](https://codecov.io/gh/selfrefactor/string-fn/branch/master/graph/badge.svg)](https://codecov.io/gh/selfrefactor/string-fn)
[![CDNJS](https://img.shields.io/cdnjs/v/string-fn.svg)](https://cdnjs.com/libraries/string-fn)
[![FOSSA Status](https://app.fossa.com/api/projects/git%2Bgithub.com%2Fselfrefactor%2Fstring-fn.svg?type=shield)](https://app.fossa.com/projects/git%2Bgithub.com%2Fselfrefactor%2Fstring-fn?ref=badge_shield)

# String-fn

String manipulation library build on top of `Rambda`

## Example

```
import { camelCase } from 'string-fn'
console.log(camelCase('foo-bar-baz'))
// => fooBarBaz
```

## Installation

- Use **yarn add string-fn** for Webpack and Node.js usage:

- For browser usage, the exported global is `StringFn` and the CDN link is the following:

```
https://unpkg.com/rambda@2.11.0/dist/stringFn.umd.js
```

## API

### between

> between(str, left, right)

It returns **str** substring found between **left** and **right** markers.

```
stringFn.between('begin foobarbaz end', 'foo', 'baz')
// => 'bar'

stringFn.between('begin foo   bar   baz end', 'foo', 'baz')
// => 'bar'

stringFn.between('begin foo bar baz end', 'q', 'x')
// => 'begin foo bar baz end'

```

### camelCase

It converts a string to camel case string.

```
stringFn.camelCase('Foo-Bar')
// => 'fooBar'

stringFn.camelCase('--foo.bar')
// => 'fooBar'

stringFn.camelCase('Foo-Bar')
// => 'fooBar'

stringFn.camelCase('foo bar BAZ')
// => 'fooBarBaz'

stringFn.camelCase('foo-bar-baz')
// => 'fooBarBaz'
```

### constantCase

It converts a string to constant case string.

```
stringFn.constantCase('FooBarBaz')
// => 'FOO_BAR_BAZ'
```

### count

> count(str, substring)

It counts number of occurances of **substring** within **str**.

```
stringFn.count('fooBarfoo', 'foo')
// => 2

stringFn.count('fooBarfoo', 'baz')
// => 0

stringFn.count('foo1 Bar foo1 baz Foo1 foo1', 'foo1')
// => 3
```

### distance

> distance(firstString, secondString)

It calculates Levenshtein distance between **firstString** and **secondString**.

```
stringFn.distance('foobarbaz', 'ffoobarbaz')
// => 1

stringFn.distance('foobarbaz', 'foo')
// => 6

stringFn.distance('foo', 'foobarbaz')
// => 6

stringFn.distance('foobarbaz', 'foobarbaz')
// => 0
```

### distanceGerman

> distanceGerman(firstString, secondString)

It calculates Levenshtein distance between two normalized German strings.

```
stringFn.distanceGerman('foobarbaz', 'ffoobarbaz')
// => 1

stringFn.distanceGerman('schön', 'shön')
// => 1

stringFn.distanceGerman('Müde', 'mude')
// => 0

stringFn.distanceGerman('die Männer', 'die manner')
// => 0

stringFn.distanceGerman('der anlass', 'der Anlaß')
// => 0
```

### dotCase

It converts a string to dot case string.

```
stringFn.dotCase('FooBarBAZ')
// => 'foo.bar.baz'
```

### glob

> glob(str, globRule)

Returns boolean of **str** following **globRule**.

Three types of valid glob rules:

1. *foo
2. foo*
3. \*foo*

```
stringFn.glob('/home/dev/foo.js', '*.js')
// => true

stringFn.glob('/home/dev/foo.js', '*.ts')
// => false

stringFn.glob('/home/dev/foo.js', '/home/*')
// => true

stringFn.glob('/home/dev/foo.js', '*/dev/foo*')
// => true
```

### indent

> indent(str:string, indentCount:number)

It indents each line in **str** with **intentCount** spaces.

```
stringFn.indent('foo\nbar\nbaz', 4)
// => '    foo\n    bar\n    baz'
```

### kebabCase

It converts a string to kebab case string.

```
stringFn.kebabCase('fooBarBaz')
// => 'foo-bar-baz'

stringFn.kebabCase('foo_bar_baz')
// => 'foo-bar-baz'

stringFn.kebabCase('Foo Bar BAZ')
// => 'foo-bar-baz'

stringFn.kebabCase('__FOO_BAR__')
// => 'foo-bar'

stringFn.kebabCase('Foo Bar BAZ')
// => 'foo-bar-baz'
```

### maskSentence

> Typing

```
maskSentence( {
  sentence: string,
  easyMode: boolean = false,
  easierMode: boolean = false,
  randomMode: boolean = false,
  replacer: string = '_',
  charLimit: number = 4,
  words: string[] = []
} )
```

> Example

```
const sentence = 'it was, for what i need, good.'
const {hidden , visible} = stringFn.maskSentence({ sentence })
// hidden => ['it', 'was', ',', 'for', 'what', 'i', 'need', ',', 'good', '.']
// visible => ['i_', 'w_s', ',', 'f_r', 'w__t', 'i', 'n__d', ',', 'g__d', '.']
```

Returns object with notation **{visible: Array<string>, hidden: Array<string>}**

**visible** is array of masked words following the rules:

1. Each punctuation is treated as a word
2. If word is longer than **charLimit**, then each char from the middle part is replaced with **replacer**
3. If word is shorter than **charLimit**, then each char from the tail is replaced with **replacer**

**hidden** is the unmasked version of **visible**

You can pass **words** array so the masking rule is applied only to members of
**words**.

```
const sentence = 'it was good.'
const words = ['good']
const {hidden, visible} = stringFn.maskSentence({ sentence, words })
// hidden => ['it', 'was', 'good', '.']
// visible => ['it', 'was', 'g__d', '.']
```

### maskWords

> Typing

```
maskWords({
  words:string,
  replacer:string = '_',
  charLimit: number = 3
})
```

> Example

```
stringFn.maskWords({words:'James Brown'})
// => 'J___s B___n'

stringFn.maskWords({words:'James'})
// => 'J___s'
```

It returns a string that is a masked version of **words**

Each word of **words** is masked following the rules:

- If word is longer than **charLimit**, then each char from the middle part is replaced with **replacer**

- If word is shorter than **charLimit**, then each char from the tail is replaced with **replacer**

### pascalCase

It converts a string to pascal case string.

```
stringFn.pascalCase('fooBarBAZ')
// => 'FooBarBaz'
```

### removeIndent

```
stringFn.removeIndent('    foo\n    bar\n    baz')
// => 'foo\nbar\nbaz'
```

### reverse

```
stringFn.reverse('fooBarBaz')
// => 'zaBraBoof'
```

### seoTitle

> seoTitle(str:String, limit = 3)

Capitalize each word of **str** as long as word's length is higher or equal to
**limit**. First word is always capitalized.

```
stringFn.seoTitle('in my time |,of dying')
// => 'In my Time of Dying'

stringFn.seoTitle('i got ants in my pants')
// => 'I Got Ants in my Pants'

stringFn.seoTitle('i got ants in my pants', 2)
// => 'I Got Ants In My Pants'
```

### shuffle

```
stringFn.shuffle('fooBar') // => aforBo
```

### snakeCase

It converts a string to snake case string.

```
stringFn.snakeCase('foo bar BAZ')
// => 'foo_bar_baz'
```

### splitSentence

It generates an array with all parts of the suplied string.

```
stringFn.snakeCase('I need, more.')
// => ['I', 'need', ',', 'more', '.']
```

### stripPunctuation

It removes all the punctuation marks from **str**

```
stringFn.stripPunctuation('If my, wings should, fail me ...')
// => 'If my wings should fail me '
```

### stripTags

It removes Html tags from the supplied string.

```
stringFn.stripTags('<p>foo <b>bar</b>   <hr/> baz</p>')
// => 'foo bar baz'
```

### titleCase

It converts a string to title case string.

```
stringFn.titleCase('foo bar BAZ')
// => 'Foo Bar Baz'
```

### trim

> trim(str)

It trims **str** and turns multiple whitespace to single whitespace.

```
stringFn.trim('   foo  bar   baz   ')
// => 'foo bar baz'
```

### words

> words(str)

It returns array with the words within **str**.

```
stringFn.words('fooBarBaz')
// => [ 'foo', 'Bar', 'Baz' ]
```

### wordsX

> wordsX(str)

It is same as `words`, but for extended Latin languages(German, French, Finnish, etc.).

## Changelog

2.7.0 Support extra latin

2.6.0 Add `fitWithinLines`

2.4.0 Add `splitPerLine`