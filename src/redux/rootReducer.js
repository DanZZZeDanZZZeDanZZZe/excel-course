import {COL_RESIZE, ROW_RESIZE, CHANGE_TEXT, CHANGE_STYLES} from './types'

export function rootReducer(state, action) {
  let field

  switch (action.type) {
    case COL_RESIZE:
      field = 'colState'
      return {...state, [field]: value(state, field, action)}
    case ROW_RESIZE:
      field = 'colState'
      return {...state, [field]: value(state, field, action)}
    case CHANGE_TEXT:
      field = 'dataState'
      return {
        ...state,
        currentText: action.data.value,
        [field]: value(state, field, action)
      }
    case CHANGE_STYLES:
      return {...state, currentStyles: action.data}
    default: return state
  }
}

function value(state, field, action) {
  const val = state[field] || {}
  val[action.data.id] = action.data.value
  return val
}
