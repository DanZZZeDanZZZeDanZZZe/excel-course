import {createToolbar} from './toolbar.template';
import {$} from '@core/dom'
import {ExcelStateComponent} from '../../core/ExcelStateComponent';

export class Toolbar extends ExcelStateComponent {
  static className = 'excel__toolbar'

  constructor($root, options) {
    super($root, {
      name: 'Toolbar',
      listeners: ['click'],
      ...options
    })
  }

  prepare() {
    const initalState = {
      textAlign: 'left',
      fontWeight: 'normal',
      textDecoration: 'none',
      fontStyle: 'normal'
    }
    this.initState(initalState)
  }

  get template() {
    return createToolbar(this.state)
  }

  toHTML() {
    return this.template
  }

  onClick(event) {
    const $target = $(event.target)
    if ($target.dataset.type === 'button') {
      const value = JSON.parse($target.dataset.value)

      this.$emit('toolbar:applyStyle', value)

      const key = Object.keys(value)[0]
      this.setState({[key]: value[key]})
    }
  }
}
