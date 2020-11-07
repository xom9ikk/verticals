import { IRootState } from '@/store/reducers/state';

export const getIsLoadedBoards = (state: IRootState) => state.system.isLoadedBoards;
export const getIsLoadedColumns = (state: IRootState) => state.system.isLoadedColumns;
export const getIsLoadedTodos = (state: IRootState) => state.system.isLoadedTodos;
export const getIsOpenPopup = (state: IRootState) => state.system.isOpenPopup;
export const getIsEditableCard = (state: IRootState) => state.system.isEditableCard;
export const getIsEditableColumn = (state: IRootState) => state.system.isEditableColumn;
export const getIsEditableBoard = (state: IRootState) => state.system.isEditableBoard;
export const getQuery = (state: IRootState) => state.system.query;
export const getLanguage = (state: IRootState) => state.system.language;
export const getActiveTodoId = (state: IRootState) => state.system.activeTodoId;
export const getEditCommentId = (state: IRootState) => state.system.editCommentId;
export const getReplyCommentId = (state: IRootState) => state.system.replyCommentId;
export const getIsOpenProfile = (state: IRootState) => state.system.isOpenProfile;
export const getActiveBoardId = (state: IRootState) => state.system.activeBoardId;
export const getActiveBoardReadableId = (state: IRootState) => state.system.activeBoardReadableId;
export const getActiveTodoReadableId = (state: IRootState) => state.system.activeTodoReadableId;
export const getDroppedFiles = (state: IRootState) => state.system.droppedFiles;
