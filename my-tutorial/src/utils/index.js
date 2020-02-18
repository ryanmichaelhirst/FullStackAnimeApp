export function toCamelCase(str) {
  const firstLetter = str.charAt(0).toUpperCase()
  
  return firstLetter + str.substring(1, str.length)
}