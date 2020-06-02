import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from './table.template'
import {resize} from './resize'


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
    if (event.target.dataset.resize) {
      resize(event)
    }
  }

  toHTML() {
    return createTable()
  }
}
