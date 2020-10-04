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
  editCommentId: string;
  replyCommentId: string;
  isOpenProfile: boolean;
  activeBoardId: number | null;
  activeBoardReadableId: string | null;
}
