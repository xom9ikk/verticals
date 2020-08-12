import { createAction } from 'redux-actions';
import {
  ISetSystemCurrentTodoId,
  ISetSystemEditCommentId,
  ISetSystemIsEditableBoard,
  ISetSystemIsEditableCard,
  ISetSystemIsEditableColumn,
  ISetSystemIsOpenPopup,
  ISetSystemLanguage,
  ISetSystemQuery,
  ISetSystemReplyCommentId,
} from '../../types/actions';

enum Type {
  SET_IS_OPEN_POPUP = 'SYSTEM/SET_IS_OPEN_POPUP',
  SET_IS_EDITABLE_CARD = 'SYSTEM/SET_IS_EDITABLE_CARD',
  SET_IS_EDITABLE_COLUMN = 'SYSTEM/SET_IS_EDITABLE_COLUMN',
  SET_IS_EDITABLE_BOARD = 'SYSTEM/SET_IS_EDITABLE_BOARD',
  SET_QUERY = 'SYSTEM/SET_QUERY',
  SET_LANGUAGE = 'SYSTEM/SET_LANGUAGE',
  SET_CURRENT_TODO_ID = 'SYSTEM/SET_CURRENT_TODO_ID',
  SET_EDIT_COMMENT_ID = 'SYSTEM/SET_EDIT_COMMENT_ID',
  SET_REPLY_COMMENT_ID = 'SYSTEM/SET_REPLY_COMMENT_ID',
}

const setIsOpenPopup = createAction(Type.SET_IS_OPEN_POPUP,
  (isOpenPopup: ISetSystemIsOpenPopup) => ({ isOpenPopup }));

const setIsEditableCard = createAction(
  Type.SET_IS_EDITABLE_CARD,
  (isEditableCard: ISetSystemIsEditableCard) => ({ isEditableCard }),
);

const setIsEditableColumn = createAction(
  Type.SET_IS_EDITABLE_COLUMN,
  (isEditableColumn: ISetSystemIsEditableColumn) => ({ isEditableColumn }),
);

const setIsEditableBoard = createAction(
  Type.SET_IS_EDITABLE_BOARD,
  (isEditableBoard: ISetSystemIsEditableBoard) => ({ isEditableBoard }),
);

const setQuery = createAction(
  Type.SET_QUERY,
  (query: ISetSystemQuery) => ({ query }),
);

const setLanguage = createAction(
  Type.SET_LANGUAGE,
  (language: ISetSystemLanguage) => ({ language }),
);

const setCurrentTodoId = createAction(
  Type.SET_CURRENT_TODO_ID,
  (currentTodoId: ISetSystemCurrentTodoId) => ({ currentTodoId }),
);

const setEditCommentId = createAction(
  Type.SET_EDIT_COMMENT_ID,
  (editCommentId: ISetSystemEditCommentId) => ({ editCommentId }),
);

const setReplyCommentId = createAction(
  Type.SET_REPLY_COMMENT_ID,
  (replyCommentId: ISetSystemReplyCommentId) => ({ replyCommentId }),
);

export const SystemActions = {
  Type,
  setIsOpenPopup,
  setIsEditableCard,
  setIsEditableColumn,
  setIsEditableBoard,
  setQuery,
  setLanguage,
  setCurrentTodoId,
  setEditCommentId,
  setReplyCommentId,
};
