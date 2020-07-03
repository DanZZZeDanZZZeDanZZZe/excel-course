export function parse(value = '') {
  console.log('parse -> value', value)
  if (value.startsWith('=')) {
    try {
      return eval(value.slice(1)) + ''
    } catch (e) {
      console.warn('Skipping parse error', e.message)
    }
  }
  return value
}
