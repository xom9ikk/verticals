import { createAction } from 'redux-actions';

enum Type {
  SET_IS_OPEN_POPUP = 'SYSTEM/SET_IS_OPEN_POPUP',
}

const setIsOpenPopup = createAction(
  Type.SET_IS_OPEN_POPUP,
  (payload: boolean) => ({ isOpenPopup: payload }),
);

export const SystemActions = {
  Type,
  setIsOpenPopup,
};
