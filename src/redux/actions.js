import {COL_RESIZE, ROW_RESIZE} from './types';

export function tableResize(data) {
  return {
    type: data.el === 'col' ? COL_RESIZE : ROW_RESIZE,
    data
  }
}
