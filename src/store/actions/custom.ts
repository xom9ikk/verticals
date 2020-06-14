import { createAction } from 'redux-actions';
import { ICustomInterface } from '../../types';

enum Type {
  SET_CUSTOM = 'CUSTOM/SET_CUSTOM',
}

const setCustom = createAction(
  Type.SET_CUSTOM,
  (payload: ICustomInterface) => ({ field: payload }),
);

export const CustomActions = {
  Type,
  setCustom,
};
