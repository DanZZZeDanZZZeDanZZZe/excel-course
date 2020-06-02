import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from './table.template'
import {resizeHandler} from './table.resize'
import {shouldResize} from './table.functions'


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
  }

  toHTML() {
    return createTable()
  }
}
