import { handleActions } from 'redux-actions';
import { EnumLanguage, ISystem } from '@/types/entities';
import { SystemActions } from '../actions';

const initialState = {
  isLoadedBoards: false,
  isLoadedColumns: false,
  isLoadedTodos: false,
  isOpenPopup: false,
  isEditableCard: false,
  isEditableColumn: false,
  isEditableBoard: false,
  query: '',
  language: EnumLanguage.English,
  activeTodoId: null,
  editCommentId: '',
  replyCommentId: '',
  isOpenProfile: false,
  activeBoardId: null,
  activeBoardReadableId: null,
  activeTodoReadableId: null,
};

export const SystemReducer = handleActions<ISystem, ISystem>({
  [SystemActions.Type.SET_IS_LOADED_BOARDS]:
        (state, action) => ({ ...state, isLoadedBoards: action.payload.isLoadedBoards }),
  [SystemActions.Type.SET_IS_LOADED_COLUMNS]:
        (state, action) => ({ ...state, isLoadedColumns: action.payload.isLoadedColumns }),
  [SystemActions.Type.SET_IS_LOADED_TODOS]:
        (state, action) => ({ ...state, isLoadedTodos: action.payload.isLoadedTodos }),
  [SystemActions.Type.SET_IS_OPEN_POPUP]:
        (state, action) => ({ ...state, isOpenPopup: action.payload.isOpenPopup }),
  [SystemActions.Type.SET_IS_EDITABLE_CARD]:
        (state, action) => ({ ...state, isEditableCard: action.payload.isEditableCard }),
  [SystemActions.Type.SET_IS_EDITABLE_COLUMN]:
        (state, action) => ({ ...state, isEditableColumn: action.payload.isEditableColumn }),
  [SystemActions.Type.SET_IS_EDITABLE_BOARD]:
        (state, action) => ({ ...state, isEditableBoard: action.payload.isEditableBoard }),
  [SystemActions.Type.SET_QUERY]:
      (state, action) => ({ ...state, query: action.payload.query }),
  [SystemActions.Type.SET_LANGUAGE]:
      (state, action) => ({ ...state, language: action.payload.language }),
  [SystemActions.Type.SET_ACTIVE_TODO_ID]:
      (state, action) => ({ ...state, activeTodoId: action.payload.activeTodoId }),
  [SystemActions.Type.SET_EDIT_COMMENT_ID]:
      (state, action) => ({ ...state, editCommentId: action.payload.editCommentId }),
  [SystemActions.Type.SET_REPLY_COMMENT_ID]:
      (state, action) => ({ ...state, replyCommentId: action.payload.replyCommentId }),
  [SystemActions.Type.SET_IS_OPEN_PROFILE]:
      (state, action) => ({ ...state, isOpenProfile: action.payload.isOpenProfile }),
  [SystemActions.Type.SET_ACTIVE_BOARD_ID]:
      (state, action) => ({ ...state, activeBoardId: action.payload.activeBoardId }),
  [SystemActions.Type.SET_ACTIVE_BOARD_READABLE_ID]:
      (state, action) => ({
        ...state,
        activeBoardReadableId: action.payload.activeBoardReadableId,
      }),
  [SystemActions.Type.SET_ACTIVE_TODO_READABLE_ID]:
      (state, action) => ({
        ...state,
        activeTodoReadableId: action.payload.activeTodoReadableId,
      }),
}, initialState);
