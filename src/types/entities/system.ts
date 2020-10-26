export enum EnumLanguage {
  English,
  Russian,
  French,
  Spanish,
}

export interface ISystem {
  isLoadedBoards: boolean;
  isLoadedColumns: boolean;
  isLoadedTodos: boolean;
  isOpenPopup: boolean;
  isEditableCard: boolean;
  isEditableColumn: boolean;
  isEditableBoard: boolean;
  query: string;
  language: EnumLanguage;
  activeTodoId: number | null;
  editCommentId: number | null;
  replyCommentId: number | null;
  isOpenProfile: boolean;
  activeBoardId: number | null;
  activeBoardReadableId: string | null;
  activeTodoReadableId: string | null;
}
