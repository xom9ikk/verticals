import { IServerResponse } from './response';

export interface IUploadCommentAttachmentRequest {
  commentId: number;
  file: File;
}

export type IUploadCommentAttachmentResponse = IServerResponse<{
  file: string;
}>;
