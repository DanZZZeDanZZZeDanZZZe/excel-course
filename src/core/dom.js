class Dom {
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

  all(selector) {
    return Array.prototype.map.call(
        this.$el.querySelectorAll(selector),
        (el => {
          if (el.matches(selector)) {
            return $(el)
          }
        })
    )
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

  getCords() {
    return this.$el.getBoundingClientRect()
  }

  get dataset() {
    return this.$el.dataset
  }

  get style() {
    return this.$el.style
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
