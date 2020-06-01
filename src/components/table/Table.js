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
      let $line = null
      let value = null

      if (resize === 'col') {
        const index = $parent.index()
        const $table = $resizer.closest('[data-component="table"]')
        const $rows = $table.findAll('[data-component="row"]')
        $line = $table.find('[data-line="vertical"]')

        $resizer.css({
          opacity: '1'
        })
        $line.css({
          opacity: '1',
          left: event.clientX + 'px'
        })

        $cols = $rows.map(row => {
          return row.findAll('[data-component="cell"]')[index]
        })

        document.onmousemove = e => {
          const sourceС = $parent.getCords().right

          const delta = e.pageX - cords.right
          value = cords.width + delta

          $parent.css({
            width: value + 'px'
          })

          const finalC = $parent.getCords().right
          $line.css({
            left: e.pageX + 'px',
            opacity: sourceС === finalC ? 0 : 1
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
        $line.css({
          opacity: '0'
        })
        $resizer.css({
          opacity: '0'
        })
        $cols.forEach(item => {
          item.css({
            width: value + 'px'
          })
        })
      }
    }
  }

  toHTML() {
    return createTable()
  }
}
