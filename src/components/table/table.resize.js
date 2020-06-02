import {$} from '@core/dom'

export function resizeHandler(event) {
  const $resizer = $(event.target)
  const type = $resizer.dataset.resize

  const $parent = $resizer.closest('[data-type="resizable"]')
  const $table = $resizer.closest('[data-component="table"]')
  const lineType = type === 'col' ? 'vertical' : 'horizontal'
  const $line = $table.find(`[data-line="${lineType}"]`)

  const parentC = $parent.getCoords()
  const tableC = $table.getCoords()

  elVisibility(true, $line)
  elVisibility(false, $resizer)

  let $cols = null

  if (type === 'col') {
    const pos = event.pageX + $table.scrollLeft
    setMetric(pos, 'left', $line)
    const index = $parent.index()
    const $rows = $table.findAll('[data-component="row"]')
    $cols = $rows.map(row => {
      return row.findAll('[data-component="cell"]')[index]
    })
  } else {
    const pos = event.pageY - window.pageYOffset - tableC.top
    setMetric(pos, 'top', $line)
  }

  document.onmousemove = e => {
    elVisibility(false, $resizer)
    if (type === 'col') {
      const pos = e.pageX + $table.scrollLeft
      setMetric(pos, 'left', $line)
    } else {
      const pos = e.pageY - window.pageYOffset - tableC.top
      setMetric(pos, 'top', $line)
    }
  }

  document.onmouseup = e => {
    document.onmouseup = null
    document.onmousemove = null

    elVisibility(null, $resizer, $line)
    if (type === 'col') {
      const pos = e.pageX - $table.scrollLeft - parentC.left
      setMetric(pos, 'width', $parent, ...$cols)
    } else {
      const pos = e.pageY - window.pageYOffset - parentC.top
      setMetric(pos, 'height', $parent)
    }
  }
}

function elVisibility(vis, ...els) {
  const o = vis === null ? '' : +vis
  els.forEach(el => {
    el.css({
      opacity: o
    })
  })
}

function setMetric(rule, side, ...els) {
  rule = rule instanceof Function ? rule() : rule

  els.forEach(el => {
    el.css({
      [side]: `${rule}px`
    })
  })
}


