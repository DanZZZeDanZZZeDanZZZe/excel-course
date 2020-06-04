export function shouldResize(event) {
  return event.target.dataset.resize
}

export function isCell(event) {
  return event.target.dataset.component === 'cell'
}

export function isCellSelector(event) {
  return event.target.dataset.selector === 'cell'
}
