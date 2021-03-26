import { IRootState } from '@store/reducers';
import { createSelector } from '@reduxjs/toolkit';
import { getBoards } from '@store/selectors/boards';
import { getTodos } from '@store/selectors/todos';

export const getIsLoadedBoards = (state: IRootState) => state.system.isLoadedBoards;
export const getIsLoadedColumns = (state: IRootState) => state.system.isLoadedColumns;
export const getIsLoadedTodos = (state: IRootState) => state.system.isLoadedTodos;
export const getActivePopupId = (state: IRootState) => state.system.activePopupId;
export const getEditableBoardId = (state: IRootState) => state.system.editableBoardId;
export const getEditableColumnId = (state: IRootState) => state.system.editableColumnId;
export const getEditableHeadingId = (state: IRootState) => state.system.editableHeadingId;
export const getEditableCardId = (state: IRootState) => state.system.editableCardId;
export const getEditableSubCardId = (state: IRootState) => state.system.editableSubCardId;
export const getIsSearchMode = (state: IRootState) => state.system.isSearchMode;
export const getLanguage = (state: IRootState) => state.system.language;
export const getActiveTodoId = (state: IRootState) => state.system.activeTodoId;
export const getEditCommentId = (state: IRootState) => state.system.editCommentId;
export const getReplyCommentId = (state: IRootState) => state.system.replyCommentId;
export const getIsOpenProfile = (state: IRootState) => state.system.isOpenProfile;
export const getActiveBoardId = (state: IRootState) => state.system.activeBoardId;
export const getActiveBoardTitle = createSelector(
  [getActiveBoardId, getBoards], (activeBoardId, boards) => {
    if (!activeBoardId) return;
    const activeBoard = boards.entities.find((board) => board.id === activeBoardId);
    return activeBoard?.title;
  },
);
export const getActiveTodoTitle = createSelector(
  [getActiveTodoId, getTodos], (activeTodoId, todos) => {
    if (!activeTodoId) return;
    const activeTodo = todos.entities.find((todo) => todo.id === activeTodoId);
    return activeTodo?.title;
  },
);
export const getActiveBoardReadableId = (state: IRootState) => state.system.activeBoardReadableId;
export const getActiveTodoReadableId = (state: IRootState) => state.system.activeTodoReadableId;
export const getDroppedFiles = (state: IRootState) => state.system.droppedFiles;
export const getGalleryImagesInfo = (state: IRootState) => state.system.galleryImagesInfo;
export const getIsOpenFormattingHelp = (state: IRootState) => state.system.isOpenFormattingHelp;
