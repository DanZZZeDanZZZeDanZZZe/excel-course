const CODES = {
  A: 65,
  Z: 90
}

function createCell() {
  return `
    <div class="cell" contenteditable="">A1</div>
  `
}

function createCol(simb) {
  return `
    <div class="column">
      ${simb}
    </div>
  `
}

function createRow(cols) {
  return `
    <div class="row">
      <div class="row-info"></div>
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

function createAFilledRow(callback) {
  return createRow(createColsInRange(callback))
}

export function createTable(rowsCount = 15) {
  const headers = createAFilledRow(createHeader)
  const rows = []

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createAFilledRow(createCell))
  }

  return headers + rows
}
