import { handleActions } from 'redux-actions';
import { EnumLanguage, ISystem } from '@/types';
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
  currentTodoId: null,
  editCommentId: '',
  replyCommentId: '',
  isOpenProfile: false,
  isOpenSettings: true,
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
  [SystemActions.Type.SET_CURRENT_TODO_ID]:
      (state, action) => ({ ...state, currentTodoId: action.payload.currentTodoId }),
  [SystemActions.Type.SET_EDIT_COMMENT_ID]:
      (state, action) => ({ ...state, editCommentId: action.payload.editCommentId }),
  [SystemActions.Type.SET_REPLY_COMMENT_ID]:
      (state, action) => ({ ...state, replyCommentId: action.payload.replyCommentId }),
  [SystemActions.Type.SET_IS_OPEN_PROFILE]:
      (state, action) => ({ ...state, isOpenProfile: action.payload.isOpenProfile }),
  [SystemActions.Type.SET_IS_OPEN_SETTINGS]:
      (state, action) => ({ ...state, isOpenSettings: action.payload.isOpenSettings }),
}, initialState);
