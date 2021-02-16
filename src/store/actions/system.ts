import { createAction } from '@reduxjs/toolkit';
import {
  ISetSystemIsLoadedBoards,
  ISetSystemIsLoadedColumns,
  ISetSystemIsLoadedTodos,
  ISetSystemActiveTodoId,
  ISetSystemEditCommentId,
  ISetSystemEditableBoardId,
  ISetSystemIsEditableCard,
  ISetSystemEditableColumnId,
  ISetSystemActivePopupId,
  ISetSystemLanguage,
  ISetSystemIsSearchMode,
  ISetSystemReplyCommentId,
  ISetSystemIsOpenProfile,
  ISetSystemActiveBoardId,
  ISetSystemActiveBoardReadableId,
  ISetSystemActiveTodoReadableId,
  ISetSystemDroppedFiles,
  ISetGalleryImagesInfo,
  ISetIsOpenFormattingHelp,
} from '@type/actions';

const setIsLoadedBoards = createAction<ISetSystemIsLoadedBoards>('SYSTEM/SET_IS_LOADED_BOARDS');
const setIsLoadedColumns = createAction<ISetSystemIsLoadedColumns>('SYSTEM/SET_IS_LOADED_COLUMNS');
const setIsLoadedTodos = createAction<ISetSystemIsLoadedTodos>('SYSTEM/SET_IS_LOADED_TODOS');
const setActivePopupId = createAction<ISetSystemActivePopupId>('SYSTEM/SET_ACTIVE_POPUP_ID');
const setIsEditableCard = createAction<ISetSystemIsEditableCard>('SYSTEM/SET_IS_EDITABLE_CARD');
const setEditableBoardId = createAction<ISetSystemEditableBoardId>('SYSTEM/SET_EDITABLE_BOARD_ID');
const setEditableColumnId = createAction<ISetSystemEditableColumnId>('SYSTEM/SET_EDITABLE_COLUMN_ID');
const setIsSearchMode = createAction<ISetSystemIsSearchMode>('SYSTEM/SET_IS_SEARCH_MODE');
const setLanguage = createAction<ISetSystemLanguage>('SYSTEM/SET_LANGUAGE');
const setActiveTodoId = createAction<ISetSystemActiveTodoId>('SYSTEM/SET_ACTIVE_TODO_ID');
const setEditCommentId = createAction<ISetSystemEditCommentId>('SYSTEM/SET_EDIT_COMMENT_ID');
const setReplyCommentId = createAction<ISetSystemReplyCommentId>('SYSTEM/SET_REPLY_COMMENT_ID');
const setIsOpenProfile = createAction<ISetSystemIsOpenProfile>('SYSTEM/SET_IS_OPEN_PROFILE');
const setActiveBoardId = createAction<ISetSystemActiveBoardId>('SYSTEM/SET_ACTIVE_BOARD_ID');
const setActiveBoardReadableId = createAction<ISetSystemActiveBoardReadableId>('SYSTEM/SET_ACTIVE_BOARD_READABLE_ID');
const setActiveTodoReadableId = createAction<ISetSystemActiveTodoReadableId>('SYSTEM/SET_ACTIVE_TODO_READABLE_ID');
const setDroppedFiles = createAction<ISetSystemDroppedFiles>('SYSTEM/SET_DROPPED_FILES');
const setGalleryImagesInfo = createAction<ISetGalleryImagesInfo>('SYSTEM/SET_GALLERY_IMAGES_INFO');
const setIsOpenFormattingHelp = createAction<ISetIsOpenFormattingHelp>('SYSTEM/SET_IS_OPEN_FORMATTING_HELP');

export const SystemActions = {
  setIsLoadedBoards,
  setIsLoadedColumns,
  setIsLoadedTodos,
  setActivePopupId,
  setIsEditableCard,
  setEditableBoardId,
  setEditableColumnId,
  setIsSearchMode,
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
  setIsOpenFormattingHelp,
};
