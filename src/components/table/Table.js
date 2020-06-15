import {ExcelComponent} from '@core/ExcelComponent'
import {createTable} from './table.template'
import {resizeHandler} from './table.resize'
import {shouldResize, isCell, nextSelector} from './table.functions'
import {TableSelection} from './TableSelection'
import {$, Dom} from '@core/dom'
import * as actions from '@/redux/actions'

export class Table extends ExcelComponent {
  static className = 'excel__table'

  constructor($root, options) {
    super($root, {
      name: 'Table',
      listeners: ['mousedown', 'keydown', 'input'],
      data: {
        component: 'table'
      },
      ...options
    })
  }

  async resizeTable() {
    try {
      const data = await resizeHandler(event)
      this.$dispatch(actions.tableResize(data))
    } catch (e) {
      console.warn('Resize error', e.message)
    }
  }

  onMousedown(event) {
    if (shouldResize(event)) {
      this.resizeTable(event)
    }

    if (isCell(event)) {
      const $target = $(event.target)

      if (event.shiftKey) {
        this.selection.selectGroup($target)
      } else {
        this.selectCell($target)
      }
    }
  }

  onKeydown(event) {
    const id = this.selection.$current.id()

    const {key} = event
    const {row, col} = nextSelector(id, key)

    if (row >= 0 || col >= 0) {
      this.selectCell({row, col})
      this.$emit('table:select', this.selection.$current)
    }
  }

  prepare() {
    this.selection = new TableSelection()
  }

  init() {
    super.init()

    const $cell = this.$root.findData('id', '0:0')
    this.selectCell($cell)
    this.$on('formula:input', text => {
      this.selection.$current.text(text)
      this.updateTextInStore(text)
    })
    this.$on('formula:enter', () => {
      this.selection.$current.focus()
    })
    // this.$subscribe(state => {
    //   console.log('TableState', state)
    // })
  }

  selectCell($cell) {
    if ($cell instanceof Dom) {
      this.selection.select($cell)
    } else {
      const {row, col} = $cell
      this.selection.selectById(row, col)
    }
    this.$emit('table:input', this.selection.$current)
  }

  toHTML() {
    return createTable(this.store.getState())
  }

  updateTextInStore(value) {
    this.$dispatch(actions.changeText({
      id: this.selection.$current.idStr,
      value
    }))
  }

  onInput(event) {
    this.updateTextInStore($(event.target).text())
  }
}
