export function replaceSpecialCharacters(text: string) {
  return text?.replace(/[^\w\s]/gi, '')
}
