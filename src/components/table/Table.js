import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from './table.template'
import {$} from '@core/dom'

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
      const resize = event.target.dataset.resize
      const $resizer = $(event.target)
      const $parent = $resizer.closest('[data-type="resizable"]')
      const cords = $parent.getCords()
      let $cols = null

      if (resize === 'col') {
        const index = $parent.index()
        const $table = $resizer.closest('[data-component="table"]')
        const $rows = $table.findAll('[data-component="row"]')
        $cols = $rows.map(row => {
          return row.findAll('[data-component="cell"]')[index]
        })
        const $resizable = [$parent, ...$cols]

        document.onmousemove = e => {
          const delta = e.pageX - cords.right
          const value = cords.width + delta
          $resizable.forEach($el => {
            $el.css({
              width: value + 'px'
            })
          })
        }
      } else {
        document.onmousemove = e => {
          const delta = e.clientY - cords.bottom
          const value = cords.height + delta
          $parent.css({
            height: value + 'px'
          })
        }
      }

      document.onmouseup = () => {
        document.onmousemove = null
      }
    }
  }

  toHTML() {
    return createTable()
  }
}
