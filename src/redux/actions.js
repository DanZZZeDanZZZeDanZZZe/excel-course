import {COL_RESIZE, ROW_RESIZE, CHANGE_TEXT} from './types';

export function tableResize(data) {
  return {
    type: data.el === 'col' ? COL_RESIZE : ROW_RESIZE,
    data
  }
}

export function changeText(data) {
  return {
    type: CHANGE_TEXT,
    data
  }
}
