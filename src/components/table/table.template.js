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

export function createTable(rowsCount = 15) {
  // const colsCount = CODES.Z - CODES.A
  const rows = []
  // const cols = []

  rows.push(createRow(createCols(CODES.A, CODES.Z, createHeader)))

  for (let i = 0; i < rowsCount; i++) {
    rows.push(createRow(createCols(CODES.A, CODES.Z, createCell)))
  }

  return rows.join('')
}
