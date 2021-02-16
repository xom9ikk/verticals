import { ICommentAttachments } from '@type/entities/comment-attachment';

export enum EnumLanguage {
  English,
  Russian,
  French,
  Spanish,
}

export enum EnumDroppedZoneType {
  CardPopup,
  Card,
}

export interface ISystem {
  isLoadedBoards: boolean;
  isLoadedColumns: boolean;
  isLoadedTodos: boolean;
  activePopupId: string | null;
  isEditableCard: boolean;
  editableColumnId: number | null;
  isEditableBoard: boolean;
  isSearchMode: boolean;
  language: EnumLanguage;
  activeTodoId: number | null;
  editCommentId: number | null;
  replyCommentId: number | null;
  isOpenProfile: boolean;
  activeBoardId: number | null;
  activeBoardReadableId: string | null;
  activeTodoReadableId: string | null;
  droppedFiles: {
    type: EnumDroppedZoneType;
    files: FileList;
  } | null;
  galleryImagesInfo: {
    images: ICommentAttachments | null;
    index: number;
  } | null;
  isOpenFormattingHelp: boolean;
}

export type ID = number;

export interface IPositions {
  [id: string]: Array<ID>;
}
