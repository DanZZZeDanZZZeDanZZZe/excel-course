import {COL_RESIZE, ROW_RESIZE, CHANGE_TEXT} from './types'

export function rootReducer(state, action) {
  let prevState

  switch (action.type) {
    case COL_RESIZE:
      prevState = state.colState || {}
      prevState[action.data.id] = action.data.value
      return {...state, colState: prevState}
    case ROW_RESIZE:
      prevState = state.rowState || {}
      prevState[action.data.id] = action.data.value
      return {...state, rowState: prevState}
    case CHANGE_TEXT:
      prevState = state.dataState || {}
      prevState[action.data.id] = action.data.value
      return {...state, currentText: action.data.value, dataState: prevState}
    default: return state
  }
}
