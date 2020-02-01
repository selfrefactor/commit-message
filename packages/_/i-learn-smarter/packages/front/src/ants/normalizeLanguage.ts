export function normalizeLanguageAnt(language: Language): string {
  return `${language.toLowerCase()}-${language}`
}
