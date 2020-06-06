export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
  }

  select($el) {
    this.clear()
    this.group.push($el)
    $el.addClass(TableSelection.className)
  }

  selectGroup($el) {
    const $startEl = this.group[0]
    const table = $startEl.closestData('component', 'table')
    const [startY, startX]= getIndexes($startEl)
    const [endY, endX] = getIndexes($el)
    this.clear()

    const push = (i, j) => {
      const $el = table.findData('id', `${i}:${j}`)
      $el.addClass(TableSelection.className)
      this.group.push($el)
    }

    const getRange = (start, end) => {
      return start < end ?
          [start, end] :
          [end, start]
    }

    const fillRow = (i) => {
      const [start, end] = getRange(startX, endX)
      for (let j = start; j <= end; j++) {
        push(i, j)
      }
    }

    const [start, end] = getRange(startY, endY)
    for (let i = start; i <= end; i++) {
      fillRow(i)
    }
  }

  clear() {
    this.group.forEach(it => it.removeClass(TableSelection.className))
    this.group = []
  }
}

function getIndexes($el) {
  return $el.dataset.id
      .split(':')
      .map(it => +it)
}
