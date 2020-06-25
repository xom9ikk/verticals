import { createAction } from 'redux-actions';

enum Type {
  SET_IS_OPEN_POPUP = 'SYSTEM/SET_IS_OPEN_POPUP',
  SET_IS_EDITABLE_CARD = 'SYSTEM/SET_IS_EDITABLE_CARD',
  SET_IS_EDITABLE_COLUMN = 'SYSTEM/SET_IS_EDITABLE_COLUMN',
  SET_IS_EDITABLE_BOARD = 'SYSTEM/SET_IS_EDITABLE_BOARD',
  SET_QUERY = 'SYSTEM/SET_QUERY',
}

const setIsOpenPopup = createAction(
  Type.SET_IS_OPEN_POPUP,
  (payload: boolean) => ({ isOpenPopup: payload }),
);

const setIsEditableCard = createAction(
  Type.SET_IS_EDITABLE_CARD,
  (payload: boolean) => ({ isEditableCard: payload }),
);

const setIsEditableColumn = createAction(
  Type.SET_IS_EDITABLE_COLUMN,
  (payload: boolean) => ({ isEditableColumn: payload }),
);

const setIsEditableBoard = createAction(
  Type.SET_IS_EDITABLE_BOARD,
  (payload: boolean) => ({ isEditableBoard: payload }),
);

const setQuery = createAction(
  Type.SET_QUERY,
  (payload: string) => ({ query: payload }),
);

export const SystemActions = {
  Type,
  setIsOpenPopup,
  setIsEditableCard,
  setIsEditableColumn,
  setIsEditableBoard,
  setQuery,
};
