import { EnumDroppedZoneType, EnumLanguage } from '@/types/entities';

export type ISetSystemIsLoadedBoards = boolean;
export type ISetSystemIsLoadedColumns = boolean;
export type ISetSystemIsLoadedTodos = boolean;
export type ISetSystemIsOpenPopup = boolean;
export type ISetSystemIsEditableCard = boolean;
export type ISetSystemIsEditableColumn = boolean;
export type ISetSystemIsEditableBoard = boolean;
export type ISetSystemQuery = string;
export type ISetSystemLanguage = EnumLanguage;
export type ISetSystemActiveTodoId = number | null;
export type ISetSystemEditCommentId = number | null;
export type ISetSystemReplyCommentId = number | null;
export type ISetSystemIsOpenProfile = boolean;
export type ISetSystemActiveBoardId = number | null;
export type ISetSystemActiveBoardReadableId = string | null;
export type ISetSystemActiveTodoReadableId = string | null;
export interface ISetSystemDroppedFiles {
  type: EnumDroppedZoneType;
  files: FileList;
}
