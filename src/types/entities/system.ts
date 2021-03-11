import { ICommentAttachments } from '@type/entities/comment-attachment';

export enum EnumLanguage {
  English,
  Russian,
  Ukrainian,
  French,
  Spanish,
  German,
  Italian,
  Polish,
  Turkish,
  Japanese,
  TraditionalChinese,
}

export enum EnumDroppedZoneType {
  CardPopup,
  Card,
}

export interface ISystem {
  readonly isLoadedBoards: boolean;
  readonly isLoadedColumns: boolean;
  readonly isLoadedTodos: boolean;
  readonly activePopupId: string | null;
  readonly editableBoardId: number | null;
  readonly editableColumnId: number | null;
  readonly editableCardId: number | string | null;
  readonly isSearchMode: boolean;
  readonly language: EnumLanguage;
  readonly activeTodoId: number | null;
  readonly editCommentId: number | null;
  readonly replyCommentId: number | null;
  readonly isOpenProfile: boolean;
  readonly activeBoardId: number | null;
  readonly activeBoardReadableId: string | null;
  readonly activeTodoReadableId: string | null;
  readonly droppedFiles: {
    type: EnumDroppedZoneType;
    files: FileList;
  } | null;
  readonly galleryImagesInfo: {
    images: ICommentAttachments | null;
    index: number;
  } | null;
  readonly isOpenFormattingHelp: boolean;
}

export type ID = number;

export interface IPositions {
  readonly [id: number]: Array<ID>;
}
