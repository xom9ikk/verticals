import { directionCalcMap, IResizableState } from '@use/resizable/types';
import { createAction, createReducer } from '@reduxjs/toolkit';

export const actions = {
  start: createAction<{ position: number; }>('START'),
  init: createAction<{ size: number; }>('INIT'),
  move: createAction<{ position: number; }>('MOVE'),
  end: createAction('END'),
};

const initialState = {} as IResizableState;

export const resizableReducer = createReducer(initialState, (builder) => {
  builder
    .addCase(actions.start, (draft, action) => {
      draft.isMove = true;
      draft.position = action.payload.position;
      draft.initSize = draft.size;
    })
    .addCase(actions.init, (draft, action) => {
      draft.size = action.payload.size;
    })
    .addCase(actions.move, (draft, action) => {
      if (!draft.isMove || draft.position === undefined || draft.initSize === undefined) {
        return draft;
      }
      const calc = directionCalcMap[draft.direction];
      draft.size = draft.initSize + (action.payload.position - draft.position) * calc;
      if (draft.maxSize && draft.size > draft.maxSize) {
        draft.size = draft.maxSize;
      }
      if (draft.minSize && draft.size < draft.minSize) {
        draft.size = draft.minSize;
      }
    })
    .addCase(actions.end, (draft) => {
      draft.isMove = false;
      draft.initSize = undefined;
    });
});
