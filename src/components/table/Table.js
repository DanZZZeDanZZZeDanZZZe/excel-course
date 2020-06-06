import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from './table.template'
import {resizeHandler} from './table.resize'
import {shouldResize, isCell, nextSelector} from './table.functions'
import {TableSelection} from './TableSelection'
import {$} from '@core/dom'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown', 'keydown'],
      data: {
        component: 'table'
      }
    })
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      resizeHandler(event)
    }

    if (isCell(event)) {
      const $target = $(event.target)

      if (event.shiftKey) {
        this.selection.selectGroup($target)
      } else {
        this.selection.select($target)
      }
    }
  }

  onKeydown(event) {
    const id = this.selection.$current.id()

    const {key} = event

    const {row, col} = nextSelector(id, key)
    this.selection.selectById(row, col)
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()
    const $cell = this.$root.findData('id', '0:0')
    this.selection.select($cell)
  }

  toHTML() {
    return createTable()
  }
}
