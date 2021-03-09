import { CommentAttachmentsActions } from '@store/actions';
import { CommentAttachmentsReducer, initialState } from '@store/reducers/comment-attachments';

const mockCommentAttachments = [{
  id: 1,
  todoId: 13,
  commentId: 12,
  path: '/path/to/comment/attachment/1',
  name: 'File name #1',
  extension: 'zip',
  size: 127243,
  mimeType: 'file',
  encoding: '8bit',
}, {
  id: 2,
  todoId: 13,
  commentId: 12,
  path: '/path/to/comment/attachment/2',
  name: 'File name #2',
  extension: 'css',
  size: 34789,
  mimeType: 'file',
  encoding: '8bit',
}, {
  id: 3,
  todoId: 13,
  commentId: 12,
  path: '/path/to/comment/attachment/3',
  name: 'File name #3',
  extension: 'html',
  size: 19237,
  mimeType: 'file',
  encoding: '8bit',
}, {
  id: 4,
  todoId: 113,
  commentId: 112,
  path: '/path/to/comment/attachment/4',
  name: 'File name #4',
  extension: 'md',
  size: 457823,
  mimeType: 'file',
  encoding: '8bit',
}, {
  id: 5,
  todoId: 113,
  commentId: 112,
  path: '/path/to/comment/attachment/5',
  name: 'File name #5',
  extension: 'txt',
  size: 453980,
  mimeType: 'file',
  encoding: '8bit',
}];

describe('Comment attachment reducer', () => {
  it('merge', () => {
    const [attachment, attachment2, attachment3, attachment4] = mockCommentAttachments;
    const initialStateWithTwoCommentAttachments = [attachment, attachment2];
    expect(CommentAttachmentsReducer(initialStateWithTwoCommentAttachments, CommentAttachmentsActions.merge([
      attachment2, attachment3, attachment4,
    ])))
      .toEqual([attachment2, attachment3, attachment4, attachment]);
  });
  it('add', () => {
    const [attachment] = mockCommentAttachments;
    expect(CommentAttachmentsReducer(initialState, CommentAttachmentsActions.add(attachment)))
      .toEqual([attachment]);
  });
  it('remove', () => {
    const [attachment, attachment2] = mockCommentAttachments;
    const initialStateWithTwoCommentAttachments = [attachment, attachment2];
    expect(CommentAttachmentsReducer(initialStateWithTwoCommentAttachments, CommentAttachmentsActions.remove({
      id: attachment2.id,
    })))
      .toEqual([attachment]);
  });
});
