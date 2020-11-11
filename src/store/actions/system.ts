import { createAction } from 'redux-actions';
import {
  ISetSystemIsLoadedBoards,
  ISetSystemIsLoadedColumns,
  ISetSystemIsLoadedTodos,
  ISetSystemActiveTodoId,
  ISetSystemEditCommentId,
  ISetSystemIsEditableBoard,
  ISetSystemIsEditableCard,
  ISetSystemIsEditableColumn,
  ISetSystemIsOpenPopup,
  ISetSystemLanguage,
  ISetSystemQuery,
  ISetSystemReplyCommentId,
  ISetSystemIsOpenProfile,
  ISetSystemActiveBoardId,
  ISetSystemActiveBoardReadableId,
  ISetSystemActiveTodoReadableId,
  ISetSystemDroppedFiles,
  ISetGalleryImagesInfo,
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
  SET_ACTIVE_TODO_ID = 'SYSTEM/SET_ACTIVE_TODO_ID',
  SET_EDIT_COMMENT_ID = 'SYSTEM/SET_EDIT_COMMENT_ID',
  SET_REPLY_COMMENT_ID = 'SYSTEM/SET_REPLY_COMMENT_ID',
  SET_IS_OPEN_PROFILE = 'SYSTEM/SET_IS_OPEN_PROFILE',
  SET_ACTIVE_BOARD_ID = 'SYSTEM/SET_ACTIVE_BOARD_ID',
  SET_ACTIVE_BOARD_READABLE_ID = 'SYSTEM/SET_ACTIVE_BOARD_READABLE_ID',
  SET_ACTIVE_TODO_READABLE_ID = 'SYSTEM/SET_ACTIVE_TODO_READABLE_ID',
  SET_DROPPED_FILES = 'SYSTEM/SET_DROPPED_FILES',
  SET_GALLERY_IMAGES_INFO = 'SYSTEM/SET_GALLERY_IMAGES_INFO',
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

const setActiveTodoId = createAction(
  Type.SET_ACTIVE_TODO_ID,
  (activeTodoId: ISetSystemActiveTodoId) => ({ activeTodoId }),
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
  (isOpenProfile: ISetSystemIsOpenProfile) => ({ isOpenProfile }),
);

const setActiveBoardId = createAction(
  Type.SET_ACTIVE_BOARD_ID,
  (activeBoardId: ISetSystemActiveBoardId) => ({ activeBoardId }),
);

const setActiveBoardReadableId = createAction(
  Type.SET_ACTIVE_BOARD_READABLE_ID,
  (activeBoardReadableId: ISetSystemActiveBoardReadableId) => ({ activeBoardReadableId }),
);

const setActiveTodoReadableId = createAction(
  Type.SET_ACTIVE_TODO_READABLE_ID,
  (activeTodoReadableId: ISetSystemActiveTodoReadableId) => ({ activeTodoReadableId }),
);

const setDroppedFiles = createAction(
  Type.SET_DROPPED_FILES,
  (payload: ISetSystemDroppedFiles) => ({ droppedFiles: payload }),
);

const setGalleryImagesInfo = createAction(
  Type.SET_GALLERY_IMAGES_INFO,
  (payload: ISetGalleryImagesInfo) => ({ galleryImagesInfo: payload }),
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
  setActiveTodoId,
  setEditCommentId,
  setReplyCommentId,
  setIsOpenProfile,
  setActiveBoardId,
  setActiveBoardReadableId,
  setActiveTodoReadableId,
  setDroppedFiles,
  setGalleryImagesInfo,
};
