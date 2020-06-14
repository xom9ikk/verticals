import { handleActions } from 'redux-actions';
import { CustomActions } from '../actions';
import { ICustomInterface } from '../../types';

const initialState = {
  field: '',
};

export const CustomReducer = handleActions<ICustomInterface, ICustomInterface>({
  [CustomActions.Type.SET_CUSTOM]:
        (state, action) => ({ field: action.payload.field }),
}, initialState);
