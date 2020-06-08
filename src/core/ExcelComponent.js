import {DomListener} from '@core/DomListener'

export class ExcelComponent extends DomListener {
  constructor($root, options = {}) {
    super($root, options.listeners)
    if (options.data) {
      Object.entries(options.data).forEach(item => {
        const [name, value] = item
        this.$root.dataset[name] = value
      })
    }

    this.name = options.name
    this.emitter = options.emitter

    this.prepare()
  }

  prepare() {}

  toHTML() {
    return ''
  }

  init() {
    this.initDOMListeners()
  }

  destroy() {
    this.removeDOMListeners()
  }
}
