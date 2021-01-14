export function between(str: string, left: string, right?: string): string
export function camelCase(str: string, extraLatin?: boolean): string
export function constantCase(str: string, extraLatin?: boolean): string
export function count(str: string, substr: string): number
export function distance(x: string, y: string): number
export function distanceGerman(x: string, y: string): number
export function dotCase(str: string, extraLatin?: boolean): string
export function glob(str: string, globRule: string): boolean
export function indent(str: string, indentCount: number): string
export function toFixedLineLength(str: string, lineLength: number): string
export function getIndent(str: string): number
export function isLetter(char: string): boolean
export function isPunctuation(char: string): boolean
export function kebabCase(str: string, extraLatin?: boolean): string
export function ms(input: string): number
export function msToText(ms: number): string
export function pascalCase(str: string, extraLatin?: boolean): string
export function removeIndent(str: string): string
export function reverse(str: string): string
export function seoTitle(str: string, limit?: number): string
export function shuffle(str: string): string
export function snakeCase(str: string, extraLatin?: boolean): string
export function splitSentence(sentence: string): string[]
export function stripPunctuation(str: string): string
export function stripTags(str: string): string
export function titleCase(str: string, extraLatin?: boolean): string
export function trim(str: string): string
export function words(str: string): string[]
export function wordsX(str: string): string[]
export function randomString(
  length?: number,
  alphabetOnlyFlag?: boolean
): string
export function getMaxLength(listOfSentences: string[]): number

interface SplitPerLine {
  text: string
  perLine?: number
  splitChar?: string
}
export function splitPerLine(input: SplitPerLine): string[]

interface FitWithinLines {
  text: string
  perLine?: number
  limit: number
}

export function fitWithinLines(input: FitWithinLines): string[]

export function takeArguments<T>(
  url: string,
  separator?: string,
  rawFlag?: boolean
): T

export interface MaskSentence {
  sentence: string
  replacer?: string
  charLimit?: number
  words?: string[]
  randomMode?: boolean
  easyMode?: boolean
  easierMode?: boolean
}

export interface OutputMaskSentence {
  visible: string[]
  hidden: string[]
}

export function maskSentence(input: MaskSentence): OutputMaskSentence

export interface MaskWords {
  words: string
  replacer?: string
  charLimit?: number
}

export function maskWords(input: MaskWords): string
