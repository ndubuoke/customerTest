function truncateString(str: string, limit: number) {
  return str.length < limit ? str : str.substring(0, limit) + '.....'
}

export default truncateString
