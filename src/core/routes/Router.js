import {$} from '@core/dom'
// import {ActiveRoute} from './ActiveRoute'

export class Router {
  constructor(selector, routes) {
    if (!selector) {
      throw new Error('Selector is not provided in Router')
    }

    this.$placeholder = $(selector)
    this.routes = routes

    this.changePageHandler = this.changePageHandler.bind(this)

    this.init()
  }

  init() {
    window.addEventListener('hashchange', this.changePageHandler)
    this.changePageHandler()
  }

  changePageHandler(event) {
    const Page = this.routes.excel
    console.log('Router -> changePageHandler -> this.routes', this.routes)
    console.log('Router -> changePageHandler -> Page', Page)
    const page = new Page()
    console.log('Router -> changePageHandler -> page.getRoot()', page.getRoot())
    this.$placeholder.append(page.getRoot())
  }

  destroy() {
    window.removeEventListener('hashchange', this.changePageHandler)
  }
}
