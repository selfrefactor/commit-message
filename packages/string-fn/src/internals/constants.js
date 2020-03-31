export const WORDS = /[A-Z]?[a-z]+|[A-Z]+(?![a-z])+/g
export const WORDS_EXTENDED = /[A-Z\xC0-\xD6\xD8-\xDEА-Я]?[a-z\xDF-\xF6\xF8-\xFFа-я]+|[A-Z\xC0-\xD6\xD8-\xDE]+(?![a-z\xDF-\xF6\xF8-\xFF])/g
export const PUNCTUATIONSX = /[",\.\?]/g
export const PUNCTUATIONS = /[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,\-./:;<=>?@[\]^_`{|}~]/g
export const HTML_TAGS = /<[^>]*>/g
