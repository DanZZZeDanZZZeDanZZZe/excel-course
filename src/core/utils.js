export function capitalize(string) {
  if (typeof string !== 'string') {
    return ''
  }
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function createStyle(styleObj) {
  let inlineStyle = ''
  for (const style in styleObj) {
    if (Object.prototype.hasOwnProperty.call(styleObj, style)) {
      inlineStyle += ` ${getStyleName(style)}: ${styleObj[style]};`
    }
  }
  return inlineStyle
}

export function getStyleName(camelCaseName) {
  const charCheck = (item) => {
    const lowItem = item.toLowerCase()
    return item === item.toUpperCase() ?
      '-' + lowItem :
      lowItem
  }

  return camelCaseName
      .trim()
      .split('')
      .map(charCheck)
      .join('')
}
