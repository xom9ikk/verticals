import { createAction } from 'redux-actions';

enum Type {
  SET_IS_OPEN_POPUP = 'SYSTEM/SET_IS_OPEN_POPUP',
  SET_IS_EDITABLE_CARD = 'SYSTEM/SET_IS_EDITABLE_CARD',
}

const setIsOpenPopup = createAction(
  Type.SET_IS_OPEN_POPUP,
  (payload: boolean) => ({ isOpenPopup: payload }),
);

const setIsEditableCard = createAction(
  Type.SET_IS_EDITABLE_CARD,
  (payload: boolean) => ({ isEditableCard: payload }),
);

export const SystemActions = {
  Type,
  setIsOpenPopup,
  setIsEditableCard,
};
