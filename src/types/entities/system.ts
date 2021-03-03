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
  editableBoardId: number | null;
  editableColumnId: number | null;
  editableCardId: number | string | null;
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
  [id: number]: Array<ID>;
}
