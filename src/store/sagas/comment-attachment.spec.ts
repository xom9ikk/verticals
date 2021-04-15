import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import { CommentAttachmentService } from '@services/comment-attachment';
import { CommentAttachmentsActions } from '@store/actions';
import { watchCommentAttachment } from '@store/sagas/comment-attachment';
import { useAlert } from '@use/alert';

// @ts-ignore
const commentAttachmentService = new CommentAttachmentService();
const { show, ALERT_TYPES } = useAlert();

const mockAttachment = {
  id: 1,
  todoId: 13,
  subTodoId: 14,
  commentId: 12,
  path: '/path/to/comment/attachment/1',
  name: 'File name #1',
  extension: 'zip',
  size: 127243,
  mimeType: 'file',
  encoding: '8bit',
};

describe('Comment attachment saga flow', () => {
  it('fetch by todo id', () => {
    const mockData = {
      attachments: [mockAttachment],
    };
    const payload = {
      todoId: mockAttachment.todoId,
    };

    return expectSaga(watchCommentAttachment, commentAttachmentService)
      .provide([
        [matchers.apply.fn(commentAttachmentService.getByTodoId), {
          data: mockData,
        }],
      ])
      .dispatch(CommentAttachmentsActions.effect.fetchByTodoId(payload))
      .apply(commentAttachmentService, commentAttachmentService.getByTodoId, [payload])
      .put(CommentAttachmentsActions.merge(mockData.attachments))
      .silentRun();
  });
  it('fetch by sub todo id', () => {
    const mockData = {
      attachments: [mockAttachment],
    };
    const payload = {
      subTodoId: mockAttachment.subTodoId,
    };

    return expectSaga(watchCommentAttachment, commentAttachmentService)
      .provide([
        [matchers.apply.fn(commentAttachmentService.getBySubTodoId), {
          data: mockData,
        }],
      ])
      .dispatch(CommentAttachmentsActions.effect.fetchBySubTodoId(payload))
      .apply(commentAttachmentService, commentAttachmentService.getBySubTodoId, [payload])
      .put(CommentAttachmentsActions.merge(mockData.attachments))
      .silentRun();
  });
  it('upload files', () => {
    const files = [{ name: '1.zip' }, { name: '2.zip' }, { name: '3.zip' }] as any;

    const payload = {
      commentId: mockAttachment.commentId,
      files,
    };

    return expectSaga(watchCommentAttachment, commentAttachmentService)
      .provide([
        [matchers.apply.fn(commentAttachmentService.uploadFile), {
          data: mockAttachment,
        }],
      ])
      .dispatch(CommentAttachmentsActions.effect.uploadFiles(payload))
      .put(CommentAttachmentsActions.add(mockAttachment))
      .put(CommentAttachmentsActions.add(mockAttachment))
      .put(CommentAttachmentsActions.add(mockAttachment))
      .silentRun();
  });
  it('upload file', () => {
    const file = new FormData();
    file.append('key', 'value');

    const payload = {
      commentId: mockAttachment.commentId,
      file,
    };

    return expectSaga(watchCommentAttachment, commentAttachmentService)
      .provide([
        [matchers.apply.fn(commentAttachmentService.uploadFile), {
          data: mockAttachment,
        }],
      ])
      .dispatch(CommentAttachmentsActions.effect.uploadFile(payload))
      .put(CommentAttachmentsActions.add(mockAttachment))
      .silentRun();
  });
  it('remove', () => {
    const payload = {
      id: 77,
    };

    return expectSaga(watchCommentAttachment, commentAttachmentService)
      .provide([
        [matchers.apply.fn(commentAttachmentService.remove), undefined],
      ])
      .dispatch(CommentAttachmentsActions.effect.remove(payload))
      .apply(commentAttachmentService, commentAttachmentService.remove, [payload])
      .put(CommentAttachmentsActions.remove(payload))
      .call(show, 'Attachments', 'Attachment removed successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
});
