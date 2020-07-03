import {ExcelComponent} from '@core/ExcelComponent';
import {$} from '@core/dom'

export class Formula extends ExcelComponent {
  static className = 'excel__formula'

  constructor($root, options) {
    super($root, {
      name: 'Formula',
      subscribe: ['currentText'],
      listeners: ['input', 'keydown'],
      ...options
    })
  }

  toHTML() {
    return `
      <div class="info">fx</div>
      <div 
        class="input" 
        contenteditable 
        spellcheck="false" 
        data-component="formula"
      >
      </div>
    `
  }

  init() {
    super.init()

    this.$formula = this.$component('formula')

    this.$on('table:select', $cell => {
      this.$formula.text($cell.dataset.text)
    })
  }

  storeChanged({currentText}) {
    this.$formula.text(currentText)
  }

  onInput(event) {
    this.$emit('formula:input', $(event.target).text())
  }

  onKeydown(event) {
    const keys = [
      'Enter',
      'Tab'
    ]
    const {key} = event
    if (keys.includes(key)) {
      event.preventDefault()

      switch (key) {
        case 'Enter':
        case 'Tab':
          this.$emit('formula:enter')
      }
    }
  }

  onClick() {}
}
