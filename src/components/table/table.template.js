const CODES = {
  A: 65,
  Z: 90
}

function createCell() {
  return `
    <div class="cell" contenteditable=""></div>
  `
}

function createCol(simb) {
  return `
    <div class="column" data-type="resizable">
      ${simb}
      <div class="col-resize" data-resize="col"></div>
    </div>
  `
}

function createRow(index, cols) {
  const resize = index ? '<div class="row-resize"></div>' : ''
  return `
    <div class="row">
      <div class="row-info">
        ${index ? index : ''}
        ${resize}
      </div>
      <div class="row-data">${cols}</div>
    </div>
  `
}

function createCols(codeStart, codeEnd, callback) {
  const cols = []
  for (let i = codeStart; i <= codeEnd; i++) {
    cols.push(callback(i))
  }
  return cols.join('')
}

function createHeader(i) {
  return createCol(String.fromCharCode(i))
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
    rows.push(createAFilledRow(i + 1, createCell))
  }

  return headers + rows.join('')
}
