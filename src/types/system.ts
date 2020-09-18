export enum EnumLanguage {
  English,
  Russian,
  French,
  Spanish,
}

export interface ISystem {
  isOpenPopup: boolean;
  isEditableCard: boolean;
  isEditableColumn: boolean;
  isEditableBoard: boolean;
  query: string;
  language: EnumLanguage;
  currentTodoId: number | null;
  editCommentId: string;
  replyCommentId: string;
}
