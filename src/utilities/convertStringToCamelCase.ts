export function camelize(str: string) {
  if (str.substring(0, 2).toLowerCase() === 'id') return str
  return str
    .replace(/(?:^\w|[A-Z]|\b\w)/g, function (word, index) {
      return index === 0 ? word.toLowerCase() : word.toUpperCase()
    })
    .replace(/\s+/g, '')
}
