import { ICommentAttachments } from '@/types/entities/comment-attachment';

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
  isOpenPopup: boolean;
  isEditableCard: boolean;
  isEditableColumn: boolean;
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
  } | null
}
