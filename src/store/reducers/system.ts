import { handleActions } from 'redux-actions';
import { SystemActions } from '../actions';
import { ISystem } from '../../types';

const initialState = {
  isOpenPopup: false,
  isEditableCard: false,
};

export const SystemReducer = handleActions<ISystem, ISystem>({
  [SystemActions.Type.SET_IS_OPEN_POPUP]:
        (state, action) => ({ ...state, isOpenPopup: action.payload.isOpenPopup }),
  [SystemActions.Type.SET_IS_EDITABLE_CARD]:
        (state, action) => ({ ...state, isEditableCard: action.payload.isEditableCard }),
}, initialState);
