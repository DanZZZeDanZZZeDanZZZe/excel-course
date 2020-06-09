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
    this.unsubscribers = []

    this.prepare()
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
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
    this.unsubscribers.forEach(unsub => unsub())
  }

  $component(name, parent) {
    parent = parent || this.$root
    return parent.findData('component', name)
  }
}
