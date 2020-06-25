import { handleActions } from 'redux-actions';
import { SystemActions } from '../actions';
import { ISystem } from '../../types';

const initialState = {
  isOpenPopup: false,
  isEditableCard: false,
  isEditableColumn: false,
  isEditableBoard: false,
  query: '',
};

export const SystemReducer = handleActions<ISystem, ISystem>({
  [SystemActions.Type.SET_IS_OPEN_POPUP]:
        (state, action) => ({ ...state, isOpenPopup: action.payload.isOpenPopup }),
  [SystemActions.Type.SET_IS_EDITABLE_CARD]:
        (state, action) => ({ ...state, isEditableCard: action.payload.isEditableCard }),
  [SystemActions.Type.SET_IS_EDITABLE_COLUMN]:
        (state, action) => ({ ...state, isEditableColumn: action.payload.isEditableColumn }),
  [SystemActions.Type.SET_IS_EDITABLE_BOARD]:
        (state, action) => ({ ...state, isEditableBoard: action.payload.isEditableBoard }),
  [SystemActions.Type.SET_QUERY]:
        (state, action) => ({ ...state, query: action.payload.query }),
}, initialState);
