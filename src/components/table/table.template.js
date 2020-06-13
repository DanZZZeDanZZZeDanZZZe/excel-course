const CODES = {
  A: 65,
  Z: 90
}

function createChar(num, code) {
  return String.fromCharCode(num + code)
}

function createCell(row, col, data) {
  return `
    <div 
      class="cell" 
      contenteditable="" 
      data-component="cell"
      data-id=${row}:${col}
    >
    </div>
  `
}

function createHeader(index, data) {
  return `
    <div 
      class="column" 
      data-type="resizable"
      data-col=${index}
    >
      ${createChar(index, CODES.A)}
      <div 
        class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createElement(index, col, data) {
  return index ?
      createCell(index - 1, col, data) :
      createHeader(index, data)
}

function createRow(index, colsCount, data) {
  const isRow = !!index
  const resize = isRow ? '<div class="row-resize" data-resize="row"></div>' : ''
  const component = isRow ? 'row' : 'headers'

  const $elements = new Array(colsCount)
      .fill(null)
      .map((el, colIndex) => createElement(index, colIndex, data))
      .join('')

  return `
    <div class="row" 
      data-type="resizable"
      data-component=${component}
      ${isRow ? 'data-row='+ index : ''}
    >
      <div class="row-info">
        ${isRow ? index: ''}
        ${resize}
      </div>
      <div class="row-data">
        ${$elements}
      </div>
    </div>
  `
}

export function createTable(data, rowsCount = 15) {
  const colsCount = CODES.Z - CODES.A
  const rows = new Array(rowsCount + 1)
      .fill(null)
      .map((el, index) => createRow(index, colsCount, data))

  const logicEls = `
    <div class="vertical-line" data-line="vertical"></div>
    <div class="horizontal-line" data-line="horizontal"></div>
  `

  return logicEls + rows.join('')
}
