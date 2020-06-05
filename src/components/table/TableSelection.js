import {isCell} from './table.functions'
import {$} from '@core/dom'

class TableSelection {
  els = {
    start: null,
    end: null
  }

  constructor(target) {
    this.select(target)
  }

  select(target) {
    const calculate = () => {
      this.group = false
      this.els = {
        start: {
          $el: $(target),
          coords: $(target).getCoords()
        },
        end: null
      }
      console.log('no group')
      this.els.start.$el.addClass('selected')
    }

    if (!this.$end && !this.$start) {
      calculate()
    }
  }

  selectGroup(target) {
    if (target !== this.els.end?.$el?.getEl()) {
      this.group = true
      this.els = {
        ...this.els,
        end: {
          $el: $(target),
          coords: $(target).getCoords()
        }
      }
      console.log('group')
    }
  }

  clear() {
    if (!this.group) {
      this.els.start.$el.removeClass('selected')
    }
    this.els = {
      start: null,
      end: null
    }
  }

  get $start() {
    return this.els.start?.$el
  }

  get $end() {
    return this.els.end?.$el
  }
}

export function createSelection(event) {
  const tableSelection = new TableSelection(event.target)

  document.onmousemove = e => {
    if (isCell(e)) {
      if (tableSelection.$start.getEl() !== e.target) {
        tableSelection.selectGroup(e.target)
      } else {
        tableSelection.select(e.target)
      }
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
