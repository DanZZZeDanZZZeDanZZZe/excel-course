import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from './table.template'
import {resizeHandler} from './table.resize'
import {shouldResize, isCell} from './table.functions'
import {createSelection} from './TableSelection'


export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root) {
    super($root, {
      listeners: ['mousedown'],
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
      if (this.selection) {
        this.selection.clear()
      }
      this.selection = createSelection(event)
    }
  }

  toHTML() {
    return createTable()
  }
}
