export class Dom {
  constructor(selector) {
    this.$el = typeof selector === 'string' ?
      document.querySelector(selector) :
      selector
  }

  remove() {
    this.$el.parentNode.removeChild(this.$el)
    return this
  }

  index() {
    const children = this.$el.parentNode.children
    for (const i in children) {
      if (children[i] === this.$el) return i
    }
  }

  html(html) {
    if (typeof html === 'string') {
      this.$el.innerHTML = html
      return this
    }
    return this.$el.outerHtml.trim()
  }

  clear() {
    this.html('')
    return this
  }

  text(text) {
    if (typeof text === 'string') {
      this.$el.textContent = text
      return this
    }
    if (this.$el.tagName.toLowerCase() === 'input') {
      return this.$el.value.trim()
    }
    return this.$el.textContent.trim()
  }

  on(eventType, callback) {
    this.$el.addEventListener(eventType, callback)
  }

  off(eventType, callback) {
    this.$el.removeEventListener(eventType, callback)
  }

  append(node) {
    if (node instanceof Dom) {
      node = node.$el
    }
    if (Element.prototype.append) {
      this.$el.append(node)
    } else {
      this.$el.appendChild(node)
    }
    return this
  }

  closest(selector) {
    return $(this.$el.closest(selector))
  }

  findAll(selector) {
    return Array.prototype.map.call(
        this.$el.querySelectorAll(selector),
        (el => {
          if (el.matches(selector)) {
            return $(el)
          }
        })
    )
  }

  find(selector) {
    return $(this.$el.querySelector(selector))
  }

  findData(name, value) {
    return $(this.$el)
        .find(`[data-${name}="${value}"]`)
  }

  findAllData(name, value) {
    return $(this.$el)
        .findAll(`[data-${name}="${value}"]`)
  }

  closestData(name, value) {
    return $(this.$el)
        .closest(`[data-${name}="${value}"]`)
  }

  family(selector) {
    return Array.prototype.map.call(
        this.$el.parentNode.children,
        (el => {
          if (el.matches(selector)) {
            return $(el)
          }
        })
    )
  }

  getCoords() {
    return this.$el.getBoundingClientRect()
  }

  css(styles = {}) {
    if (styles instanceof Object) {
      for (const [name, value] of Object.entries(styles)) {
        this.$el.style[name] = value
      }
      return this
    }
    throw new Error('argument is not an instance of class Object')
  }

  addClass(className) {
    this.$el.classList.add(className)
    return this
  }

  removeClass(className) {
    this.$el.classList.remove(className)
    return this
  }

  id(row, col) {
    if (!row && !col) {
      const arr = this.$el.dataset.id
          .split(':')
      return {
        row: +arr[0],
        col: +arr[1]
      }
    }
    const {currnetRow, currnetCol} = this.$el.id()
    row = !row ? currnetRow : row
    col = !col ? currnetCol : col
    this.$el.dataset.id = row + ':' + col
    return this
  }

  focus() {
    this.$el.focus()
    return this
  }

  get dataset() {
    return this.$el.dataset
  }

  get style() {
    console.log(this.$el.style)
    return this.$el.style
  }

  get height() {
    return this.$el.offsetHeight
  }

  get width() {
    return this.$el.offsetWidth
  }

  get scrollLeft() {
    return this.$el.scrollLeft
  }

  get scrollTop() {
    return this.$el.scrollTop
  }

  getEl() {
    return this.$el
  }
}

export function $(selector) {
  return new Dom(selector)
}

$.create = (tagName, classes = '') => {
  const el = document.createElement(tagName)
  if (classes) {
    el.classList.add(classes)
  }
  return $(el)
}
