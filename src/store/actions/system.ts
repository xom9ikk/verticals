import { createAction } from 'redux-actions';
import {
  ISetSystemIsLoadedBoards,
  ISetSystemIsLoadedColumns,
  ISetSystemIsLoadedTodos,
  ISetSystemCurrentTodoId,
  ISetSystemEditCommentId,
  ISetSystemIsEditableBoard,
  ISetSystemIsEditableCard,
  ISetSystemIsEditableColumn,
  ISetSystemIsOpenPopup,
  ISetSystemLanguage,
  ISetSystemQuery,
  ISetSystemReplyCommentId,
  ISetIsOpenProfile,
  ISetActiveBoardId,
} from '@/types/actions';

enum Type {
  SET_IS_LOADED_BOARDS = 'SYSTEM/SET_IS_LOADED_BOARDS',
  SET_IS_LOADED_COLUMNS = 'SYSTEM/SET_IS_LOADED_COLUMNS',
  SET_IS_LOADED_TODOS = 'SYSTEM/SET_IS_LOADED_TODOS',
  SET_IS_OPEN_POPUP = 'SYSTEM/SET_IS_OPEN_POPUP',
  SET_IS_EDITABLE_CARD = 'SYSTEM/SET_IS_EDITABLE_CARD',
  SET_IS_EDITABLE_COLUMN = 'SYSTEM/SET_IS_EDITABLE_COLUMN',
  SET_IS_EDITABLE_BOARD = 'SYSTEM/SET_IS_EDITABLE_BOARD',
  SET_QUERY = 'SYSTEM/SET_QUERY',
  SET_LANGUAGE = 'SYSTEM/SET_LANGUAGE',
  SET_CURRENT_TODO_ID = 'SYSTEM/SET_CURRENT_TODO_ID',
  SET_EDIT_COMMENT_ID = 'SYSTEM/SET_EDIT_COMMENT_ID',
  SET_REPLY_COMMENT_ID = 'SYSTEM/SET_REPLY_COMMENT_ID',
  SET_IS_OPEN_PROFILE = 'SYSTEM/SET_IS_OPEN_PROFILE',
  SET_ACTIVE_BOARD_ID = 'SYSTEM/SET_ACTIVE_BOARD_ID',
}

const setIsLoadedBoards = createAction(Type.SET_IS_LOADED_BOARDS,
  (isLoadedBoards: ISetSystemIsLoadedBoards) => ({ isLoadedBoards }));

const setIsLoadedColumns = createAction(Type.SET_IS_LOADED_COLUMNS,
  (isLoadedColumns: ISetSystemIsLoadedColumns) => ({ isLoadedColumns }));

const setIsLoadedTodos = createAction(Type.SET_IS_LOADED_TODOS,
  (isLoadedTodos: ISetSystemIsLoadedTodos) => ({ isLoadedTodos }));

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

const setIsOpenProfile = createAction(
  Type.SET_IS_OPEN_PROFILE,
  (isOpenProfile: ISetIsOpenProfile) => ({ isOpenProfile }),
);

const setActiveBoardId = createAction(
  Type.SET_ACTIVE_BOARD_ID,
  (activeBoardId: ISetActiveBoardId) => ({ activeBoardId }),
);

export const SystemActions = {
  Type,
  setIsLoadedBoards,
  setIsLoadedColumns,
  setIsLoadedTodos,
  setIsOpenPopup,
  setIsEditableCard,
  setIsEditableColumn,
  setIsEditableBoard,
  setQuery,
  setLanguage,
  setCurrentTodoId,
  setEditCommentId,
  setReplyCommentId,
  setIsOpenProfile,
  setActiveBoardId,
};
