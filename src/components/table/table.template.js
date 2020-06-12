const CODES = {
  A: 65,
  Z: 90
}

function createCell(row, col) {
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

function createCol(index, simb) {
  return `
    <div 
      class="column" 
      data-type="resizable"
      data-col=${index}
    >
      ${simb}
      <div 
        class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(index, cols) {
  const isRow = index !== null
  const resize = isRow ? '<div class="row-resize" data-resize="row"></div>' : ''
  const component = isRow ? 'row' : 'headers'

  return `
    <div class="row" 
      data-type="resizable"
      data-component=${component}
      ${isRow ? 'data-row='+ index : ''}
    >
      <div class="row-info">
        ${isRow ? index + 1 : ''}
        ${resize}
      </div>
      <div class="row-data">${cols}</div>
    </div>
  `
}

function createCols(codeStart, codeEnd, callback) {
  const cols = []
  for (let j = 0; j <= codeEnd - codeStart; j++) {
    cols.push(callback(j, codeStart))
  }
  return cols.join('')
}

function createHeader(i, code) {
  return createCol(i, String.fromCharCode(i + code))
}

function createColsInRange(callback) {
  return createCols(CODES.A, CODES.Z, callback)
}

function createAFilledRow(i, callback) {
  return createRow(i, createColsInRange(callback))
}

export function createTable(rowsCount = 15) {
  const headers = createAFilledRow(null, createHeader)
  const rows = []

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createAFilledRow(i, createCell.bind(null, i)))
  }

  const logicEls = `
    <div class="vertical-line" data-line="vertical"></div>
    <div class="horizontal-line" data-line="horizontal"></div>
  `

  return logicEls + headers + rows.join('')
}
