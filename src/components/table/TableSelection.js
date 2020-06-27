export class TableSelection {
  static className = 'selected'

  constructor() {
    this.group = []
    this.$current = null
  }

  select($el) {
    this.clear()
    this.$current = $el
    this.table = this.$current.closestData('component', 'table')
    this.group.push($el)
    $el.focus().addClass(TableSelection.className)
  }

  selectById(row, col) {
    const $el = this.table.findData('id', `${row}:${col}`)
    this.select($el)
  }

  selectGroup($el) {
    this.clear()

    const [startY, startX] = getIndexes(this.$current)
    const [endY, endX] = getIndexes($el)

    const push = (i, j) => {
      const $el = this.table.findData('id', `${i}:${j}`)
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

  get selectedIds() {
    return this.group.map($el => $el.id())
  }

  applyStyle(style) {
    this.group.forEach($el => $el.css((style)))
  }
}

function getIndexes($el) {
  return $el.dataset.id
      .split(':')
      .map(it => +it)
}
