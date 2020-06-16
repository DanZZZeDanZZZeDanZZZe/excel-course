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
    this.subscribe = options.subscribe || []
    this.store = options.store
    this.unsubscribers = []
    this.storeSub = null

    this.prepare()
  }

  $emit(event, ...args) {
    this.emitter.emit(event, ...args)
  }

  $on(event, fn) {
    const unsub = this.emitter.subscribe(event, fn)
    this.unsubscribers.push(unsub)
  }

  storeChanged(changes) {}

  isWatching(key) {
    return this.subscribe.includes(key)
  }

  $dispatch(action) {
    this.store.dispatch(action)
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
    this.storeSub.unsubscribe()
  }

  $component(name, parent) {
    parent = parent || this.$root
    return parent.findData('component', name)
  }
}
