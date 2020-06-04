import {isCell} from './table.functions'
import {$} from '@core/dom'

class TableSelection {
  constructor(target) {
    this.$current = $(target)
    const c = $(target).getCoords()

    this.coords = {
      current: c,
      start: c,
    }

    this.$table = this.$current.closestData('component', 'table')
    this.tableCoords = this.$table.getCoords()
  }

  changeCurrentEl(target) {
    this.$current = $(target)
    const c = $(target).getCoords()
    const {current, start} = this.coords

    this.coords = {
      current: c,
      previous: current,
      start
    }
  }
}

class AreaControl extends TableSelection {
  constructor(event) {
    super(event.target)
    const {x, y, height, width} = this.coords.current
    const coords = this._getRlativeCords(x, y)
    this.areaRect = {...coords, height, width}
  }

  changeArea(event) {
    this.changeCurrentEl(event.target)
    this.setSize()
    // if (this.coords.previous.x !== this.coords.current.x) {
    //   this.setWidth()
    // } else {
    //   this.setHeight()
    // }
  }

  setSize() {
    this.setHeight()
    this.setWidth()
  }

  setHeight() {
    const calculate = (mod) => {
      mod = mod ? 1 : -1
      this.areaRect = {
        ...this.areaRect,
        height: this.areaRect.height + mod * this.coords.current.height
      }
    }

    const start = this.coords.previous.y
    const current = this.coords.current.y

    if (start < current) calculate(true)
    if (start > current) calculate(false)

    // this.areaRect = {
    //   ...this.areaRect,
    //   height: this.areaRect.height + this.coords.current.height
    // }
  }

  setWidth() {
    const calculate = (mod) => {
      mod = mod ? 1 : -1
      this.areaRect = {
        ...this.areaRect,
        width: this.areaRect.width + this.coords.current.width
      }
    }

    const start = this.coords.previous.x
    const current = this.coords.current.x

    if (start < current) calculate(true)
    if (start > current) calculate(false)
    // this.areaRect = {
    //   ...this.areaRect,
    //   width: this.areaRect.width + this.coords.current.width
    // }
  }

  _getRlativeCords(x, y) {
    y = y - this.tableCoords.top
    x = x + this.$table.scrollLeft
    return {x, y}
  }
}

class SelectorControl extends AreaControl {
  constructor(event) {
    super(event)
    this.$selector = this.$table.findData('selector', 'cell')
    this.setPoint()
    this.updateSize()
  }

  changeSelector(event) {
    this.changeArea(event)
    this.updateSize()
  }

  setPoint() {
    const {x, y} = this.areaRect
    this.$selector.css({
      left: `${x}px`,
      top: `${y}px`
    })
  }

  updateSize() {
    this.updateHeight()
    this.updateWidth()
  }

  updateHeight() {
    const {height} = this.areaRect
    this.$selector.css({
      height: `${height}px`
    })
  }

  updateWidth() {
    const {width} = this.areaRect
    this.$selector.css({
      width: `${width}px`,
    })
  }

  clear() {
    this.$selector.css({
      width: null,
      height: null,
      left: null,
      top: null
    })
  }
}

export function createSelection(event) {
  const tableSelection = new SelectorControl(event)

  document.onmousemove = e => {
    if (isCell(e) && tableSelection.$current.$el !== e.target ) {
      tableSelection.changeSelector(e)
      console.log(tableSelection)
    }
  }

  document.onmouseup = e => {
    document.onmouseup = null
    document.onmousemove = null
  }

  const onkeyupCheck = (key, keyName) => {
    const callback = () => tableSelection.clear()
    return keyCheck(callback, 'onkeyup', key, keyName)
  }

  new Promise(resolve => {
    document.onkeydown = event => resolve(event.key)
  })
      .then(key => onkeyupCheck('Escape', key))

  return tableSelection
}

function keyCheck(callback, eventName, key, keyName) {
  if (key !== keyName) {
    return key
  }
  document[eventName] = null
  callback()
}
