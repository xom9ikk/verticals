import { createAction } from 'redux-actions';
import { EnumLanguage } from '../../types';

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

const setIsOpenPopup = createAction(
  Type.SET_IS_OPEN_POPUP,
  (isOpenPopup: boolean) => ({ isOpenPopup }),
);

const setIsEditableCard = createAction(
  Type.SET_IS_EDITABLE_CARD,
  (isEditableCard: boolean) => ({ isEditableCard }),
);

const setIsEditableColumn = createAction(
  Type.SET_IS_EDITABLE_COLUMN,
  (isEditableColumn: boolean) => ({ isEditableColumn }),
);

const setIsEditableBoard = createAction(
  Type.SET_IS_EDITABLE_BOARD,
  (isEditableBoard: boolean) => ({ isEditableBoard }),
);

const setQuery = createAction(
  Type.SET_QUERY,
  (query: string) => ({ query }),
);

const setLanguage = createAction(
  Type.SET_LANGUAGE,
  (language: EnumLanguage) => ({ language }),
);

const setCurrentTodoId = createAction(
  Type.SET_CURRENT_TODO_ID,
  (currentTodoId: string) => ({ currentTodoId }),
);

const setEditCommentId = createAction(
  Type.SET_EDIT_COMMENT_ID,
  (editCommentId: string) => ({ editCommentId }),
);

const setReplyCommentId = createAction(
  Type.SET_REPLY_COMMENT_ID,
  (replyCommentId: string) => ({ replyCommentId }),
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
