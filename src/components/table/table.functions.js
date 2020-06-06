export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.component === 'cell'
}

export function nextSelector({row, col}, key) {
  const keys = [
    'Enter',
    'Tab',
    'ArrowLeft',
    'ArrowRight',
    'ArrowDown',
    'ArrowUp'
  ]

  if (keys.includes(key) && !event.shiftKey) {
    event.preventDefault()
    const MIN_VALUE = 0
    switch (key) {
      case 'Enter':
      case 'ArrowDown':
        row++
        break
      case 'Tab':
      case 'ArrowRight':
        col++
        break
      case 'ArrowLeft':
        col = col - 1 < MIN_VALUE ? MIN_VALUE : col - 1
        break
      case 'ArrowUp':
        row = row - 1 < MIN_VALUE ? MIN_VALUE : row - 1
        break
    }

    return {row, col}
  }
}
