import { createReducer } from '@reduxjs/toolkit';
import { EnumLanguage, ISystem } from '@type/entities';
import { SystemActions } from '@store/actions';

export const initialState: ISystem = {
  isLoadedBoards: false,
  isLoadedColumns: false,
  isLoadedTodos: false,
  activePopupId: null,
  editableBoardId: null,
  editableColumnId: null,
  editableHeadingId: null,
  editableCardId: null,
  isSearchMode: false,
  language: EnumLanguage.English,
  activeTodoId: null,
  editCommentId: null,
  replyCommentId: null,
  isOpenProfile: false,
  activeBoardId: null,
  activeBoardReadableId: null,
  activeTodoReadableId: null,
  droppedFiles: null,
  galleryImagesInfo: null,
  isOpenFormattingHelp: false,
};

export const SystemReducer = createReducer(initialState, (builder) => builder
  .addCase(SystemActions.setIsLoadedBoards, (draft, action) => { draft.isLoadedBoards = action.payload; })
  .addCase(SystemActions.setIsLoadedColumns, (draft, action) => { draft.isLoadedColumns = action.payload; })
  .addCase(SystemActions.setIsLoadedTodos, (draft, action) => { draft.isLoadedTodos = action.payload; })
  .addCase(SystemActions.setActivePopupId, (draft, action) => { draft.activePopupId = action.payload; })
  .addCase(SystemActions.setEditableBoardId, (draft, action) => { draft.editableBoardId = action.payload; })
  .addCase(SystemActions.setEditableColumnId, (draft, action) => { draft.editableColumnId = action.payload; })
  .addCase(SystemActions.setEditableHeadingId, (draft, action) => { draft.editableHeadingId = action.payload; })
  .addCase(SystemActions.setEditableCardId, (draft, action) => { draft.editableCardId = action.payload; })
  .addCase(SystemActions.setIsSearchMode, (draft, action) => { draft.isSearchMode = action.payload; })
  .addCase(SystemActions.setLanguage, (draft, action) => { draft.language = action.payload; })
  .addCase(SystemActions.setActiveTodoId, (draft, action) => { draft.activeTodoId = action.payload; })
  .addCase(SystemActions.setEditCommentId, (draft, action) => { draft.editCommentId = action.payload; })
  .addCase(SystemActions.setReplyCommentId, (draft, action) => { draft.replyCommentId = action.payload; })
  .addCase(SystemActions.setIsOpenProfile, (draft, action) => { draft.isOpenProfile = action.payload; })
  .addCase(SystemActions.setActiveBoardId, (draft, action) => { draft.activeBoardId = action.payload; })
  .addCase(SystemActions.setActiveBoardReadableId, (draft, action) => { draft.activeBoardReadableId = action.payload; })
  .addCase(SystemActions.setActiveTodoReadableId, (draft, action) => { draft.activeTodoReadableId = action.payload; })
  .addCase(SystemActions.setDroppedFiles, (state, action) => ({
    ...state,
    droppedFiles: action.payload,
  }))
  .addCase(SystemActions.setGalleryImagesInfo, (draft, action) => { draft.galleryImagesInfo = action.payload; })
  .addCase(SystemActions.setIsOpenFormattingHelp, (draft, action) => { draft.isOpenFormattingHelp = action.payload; }));
