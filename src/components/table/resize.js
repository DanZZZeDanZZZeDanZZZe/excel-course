import {$} from '@core/dom'

export function resize(event) {
  const $resizer = $(event.target)
  const type = $resizer.dataset.resize

  // const $parent = $resizer.closest('[data-type="resizable"]')
  const $table = $resizer.closest('[data-component="table"]')
  const lineType = type === 'col' ? 'vertical' : 'horizontal'
  const $line = $table.find(`[data-line="${lineType}"]`)

  // const parentC = $parent.getCoords()
  const tableC = $table.getCoords()

  elVisibility(true, $line)
  elVisibility(false, $resizer)

  if (type === 'col') {
    const pos = event.pageX + $table.$el.scrollLeft
    absolutePos(pos, 'left', $line)
    // const $rows = $table.findAll('[data-component="row"]')
    // $cols = $rows.map(row => {
    //   return row.findAll('[data-component="cell"]')[index]
    // })
  } else {
    const pos = event.pageY - window.pageYOffset - tableC.top
    absolutePos(pos, 'top', $line)
  }

  document.onmousemove = e => {
    elVisibility(false, $resizer)
    if (type === 'col') {
      const pos = e.pageX + $table.$el.scrollLeft
      absolutePos(pos, 'left', $line)
    } else {
      window.pageYOffset
      console.log('resize -> window.pageYOffset', window.pageYOffset)

      const pos = e.pageY - window.pageYOffset - tableC.top
      absolutePos(pos, 'top', $line)
    }
  }

  document.onmouseup = e => {
    document.onmouseup = null
    document.onmousemove = null

    elVisibility(null, $resizer, $line)
  }
  // const resize = event.target.dataset.resize
  // const $resizer = $(event.target)
  // const $parent = $resizer.closest('[data-type="resizable"]')
  // const coords = $parent.getCoords()
  // let $cols = null
  // let $line = null
  // let value = null

  // if (resize === 'col') {
  //   const index = $parent.index()
  //   const $table = $resizer.closest('[data-component="table"]')
  //   const $rows = $table.findAll('[data-component="row"]')
  //   $line = $table.find('[data-line="vertical"]')

  //   $resizer.css({
  //     opacity: '1'
  //   })
  //   $line.css({
  //     opacity: '1',
  //     left: event.clientX + 'px'
  //   })

  //   $cols = $rows.map(row => {
  //     return row.findAll('[data-component="cell"]')[index]
  //   })

  //   document.onmousemove = e => {
  //     const sourceС = $parent.getCoords().right

  //     const delta = e.pageX - coords.right
  //     value = coords.width + delta

  //     $parent.css({
  //       width: value + 'px'
  //     })

  //     const finalC = $parent.getCoords().right
  //     $line.css({
  //       left: e.pageX + 'px',
  //       opacity: sourceС === finalC ? 0 : 1
  //     })
  //   }
  // } else {
  //   document.onmousemove = e => {
  //     const delta = e.clientY - coords.bottom
  //     const value = coords.height + delta
  //     $parent.css({
  //       height: value + 'px'
  //     })
  //   }
  // }

  // document.onmouseup = () => {
  //   document.onmousemove = null
  //   $line.css({
  //     opacity: '0'
  //   })
  //   $resizer.css({
  //     opacity: '0'
  //   })
  //   $cols.forEach(item => {
  //     item.css({
  //       width: value + 'px'
  //     })
  //   })
  // }
}

function elVisibility(vis, ...els) {
  const o = vis === null ? '' : +vis
  els.forEach(el => {
    el.css({
      opacity: o
    })
  })
}

function absolutePos(rule, side, ...els) {
  rule = rule instanceof Function ? rule() : rule

  els.forEach(el => {
    el.css({
      [side]: `${rule}px`
    })
  })
}


