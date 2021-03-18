import { EnumDroppedZoneType, EnumLanguage } from '@type/entities';
import { ICommentAttachments } from '@type/entities/comment-attachment';

export type ISetSystemIsLoadedBoards = boolean;
export type ISetSystemIsLoadedColumns = boolean;
export type ISetSystemIsLoadedTodos = boolean;
export type ISetSystemActivePopupId = string | null;
export type ISetSystemEditableBoardId = number | null;
export type ISetSystemEditableColumnId = number | null;
export type ISetSystemEditableHeadingId = number | string | null;
export type ISetSystemEditableCardId = number | string | null;
export type ISetSystemIsSearchMode = boolean;
export type ISetSystemLanguage = EnumLanguage;
export type ISetSystemActiveTodoId = number | null;
export type ISetSystemEditCommentId = number | null;
export type ISetSystemReplyCommentId = number | null;
export type ISetSystemIsOpenProfile = boolean;
export type ISetSystemActiveBoardId = number | null;
export type ISetSystemActiveBoardReadableId = string | null;
export type ISetSystemActiveTodoReadableId = string | null;
export type ISetSystemDroppedFiles = {
  readonly type: EnumDroppedZoneType;
  readonly files: FileList;
} | null;
export type ISetGalleryImagesInfo = {
  readonly images: ICommentAttachments | null;
  readonly index: number;
} | null;
export type ISetIsOpenFormattingHelp = boolean;
