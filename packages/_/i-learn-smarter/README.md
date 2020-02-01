![GitHub last commit](https://img.shields.io/github/last-commit/selfrefactor/front.svg)
![GitHub commit activity](https://img.shields.io/github/commit-activity/y/selfrefactor/front.svg)

# Front

Frontend code of I Learn Smarter project - https://ilearnsmarter.com

## TODO

- Cannot upgrade due to object spread issues

- Rename `maid start` to `maid in`

## Modes

### Write Sentence Movie mode

- https://ilearnsmarter.com/write-sentence?auto=2.5

Each step is 2.5 seconds and it pauses for 4s at the end of each sentence:

- https://ilearnsmarter.com/write-sentence?auto=2.5?pause=4

Very fast:

- https://ilearnsmarter.com/write-sentence?auto=0.3?pause=2.7

### Accept speech

- https://ilearnsmarter.com/learning-meme?easier?easiest?mic

- https://ilearnsmarter.com/write-sentence?easier?easiest?mic

### Accept speech + visible sentence

- https://ilearnsmarter.com/write-sentence?mic?visible

### Accept speech with auto click on next

https://ilearnsmarter.com/learning-meme?easier?easiest?mic?pause=2

### Lock keypress to correct char

- https://ilearnsmarter.com/write-sentence?lock?easy

### Easy

https://ilearnsmarter.com/learning-meme?easy

https://ilearnsmarter.com/write-sentence?easy

### Easiest

https://ilearnsmarter.com/learning-meme?easier?easiest

https://ilearnsmarter.com/write-sentence?easier?easiest

### Easiest + Reset database ID

https://ilearnsmarter.com/learning-meme?easier?easiest?reset

https://ilearnsmarter.com/write-sentence?easier?easiest?reset

### Engish to Bulgarian

https://ilearnsmarter.com/?from-language=EN?to-language=BG

### Easy mode

- https://ilearnsmarter.com/write-sentence?auto=2?easier?random

### Adjust text size

It applies only to `Write Sentence`

> Default value is 2700. As lower as larger the text gets.

For large screens value should be around 1300:

- https://ilearnsmarter.com/write-sentence?window=1300

### Passing id

- https://ilearnsmarter.com/write-sentence?id=you-ready-new-something

Works with spaces as well:

- https://ilearnsmarter.com/write-sentence?id=you ready new something

> There is DB instance with alt tag 'you ready new something' and it will be placed ahead of other indexes. That won't happen if the instance doesn't pass the filters of the current application.

### Force mobile or desktop

- https://ilearnsmarter.com/?big

- https://ilearnsmarter.com/?small

## Order words Android application

- https://play.google.com/store/apps/details?id=selfrefactor.order.words

## Issues

- Upgrade of Driver.js leaves breaks the build

## TODO

### Choose-word

- get more filler words from word-profile DB

- sentences with one letter words must be filtered out upon init
