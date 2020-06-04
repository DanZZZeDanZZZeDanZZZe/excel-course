import {isCell} from './table.functions'
import {$} from '@core/dom'

class TableSelection {
  constructor(target) {
    this.$currentEl = $(target)
    this.currentElCoords = $(target).getCoords()
    this.previousElCoords = this.currentElCoords
    this.$table = this.$currentEl.closestData('component', 'table')
    this.tableCoords = this.$table.getCoords()
  }

  changeCurrentEl(target) {
    this.$currentEl = $(target)
    this.previousElCoords = this.currentElCoords
    this.currentElCoords = $(target).getCoords()
  }
}

class AreaControl extends TableSelection {
  constructor(event) {
    super(event.target)
    const {x, y, height, width} = this.currentElCoords
    const coords = this._getRlativeCords(x, y)
    this.areaRect = {...coords, height, width}
  }

  changeArea(event) {
    this.changeCurrentEl(event.target)
    this.setSize()
    // if (this.previousElCoords.x !== this.currentElCoords.x) {
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
        height: this.areaRect.height + mod * this.currentElCoords.height
      }
    }

    const start = this.previousElCoords.y
    const current = this.currentElCoords.y

    if (start < current) calculate(true)
    if (start > current) calculate(false)

    // this.areaRect = {
    //   ...this.areaRect,
    //   height: this.areaRect.height + this.currentElCoords.height
    // }
  }

  setWidth() {
    const calculate = (mod) => {
      mod = mod ? 1 : -1
      this.areaRect = {
        ...this.areaRect,
        width: this.areaRect.width + this.currentElCoords.width
      }
    }

    const start = this.previousElCoords.x
    const current = this.currentElCoords.x

    if (start < current) calculate(true)
    if (start > current) calculate(false)
    // this.areaRect = {
    //   ...this.areaRect,
    //   width: this.areaRect.width + this.currentElCoords.width
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
    if (isCell(e) && tableSelection.$currentEl.$el !== e.target ) {
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
