import { CommentsActions } from '@store/actions';
import { CommentsReducer, initialState } from '@store/reducers/comments';

const mockComments = [{
  id: 1,
  userId: 11,
  todoId: 13,
  text: 'Comment text',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
  replyCommentId: 77,
  likedUsers: [{
    name: 'John',
    surname: 'Doe',
    username: 'john.doe',
    avatar: '/path/to/john/avatar',
  }],
}, {
  id: 2,
  userId: 11,
  todoId: 13,
  text: 'Comment text #2',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
  replyCommentId: 77,
  likedUsers: [{
    name: 'John',
    surname: 'Doe',
    username: 'john.doe',
    avatar: '/path/to/john/avatar',
  }],
}, {
  id: 3,
  userId: 11,
  todoId: 13,
  text: 'Comment text #3',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
  replyCommentId: 77,
}, {
  id: 4,
  userId: 111,
  todoId: 113,
  text: 'Comment text #4',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
  replyCommentId: 77,
}, {
  id: 5,
  userId: 111,
  todoId: 113,
  text: 'Comment text #5',
  createdAt: new Date().getTime(),
  updatedAt: new Date().getTime(),
  replyCommentId: 77,
  likedUsers: [{
    name: 'John',
    surname: 'Doe',
    username: 'john.doe',
    avatar: '/path/to/john/avatar',
  }],
}];

describe('Comment reducer', () => {
  it('set all', () => {
    const [comment, comment2] = mockComments;
    expect(CommentsReducer(initialState, CommentsActions.setAll([comment, comment2])))
      .toEqual([comment, comment2]);
  });
  it('add comment', () => {
    const [comment, comment2, comment3] = mockComments;
    const initialStateWithTwoComments = [comment, comment2];
    expect(CommentsReducer(initialStateWithTwoComments, CommentsActions.add(comment3))).toEqual([
      ...initialStateWithTwoComments,
      comment3,
    ]);
  });
  it('remove comment', () => {
    const [comment, comment2] = mockComments;
    const initialStateWithTwoComments = [comment, comment2];
    expect(CommentsReducer(initialStateWithTwoComments, CommentsActions.remove(comment2))).toEqual([
      comment,
    ]);
  });
  it('update comment text', () => {
    const [comment, comment2] = mockComments;
    const initialStateWithTwoComments = [comment, comment2];
    expect(CommentsReducer(initialStateWithTwoComments, CommentsActions.updateText({
      id: comment2.id,
      text: 'New Comment text #2',
    }))).toEqual([
      comment, {
        ...comment2,
        text: 'New Comment text #2',
        updatedAt: expect.any(Number),
      },
    ]);
  });
  it('like comment', () => {
    const [comment, comment2] = mockComments;
    const initialStateWithTwoComments = [comment, comment2];
    const userLike = {
      name: 'Sam',
      surname: 'Smith',
      username: 'sam.smith',
      avatar: '/path/to/sam/avatar',
    };
    expect(CommentsReducer(initialStateWithTwoComments, CommentsActions.updateLike({
      commentId: comment.id,
      like: userLike,
      isLiked: true,
    }))).toEqual([{
      ...comment,
      likedUsers: [
        ...comment.likedUsers!,
        userLike,
      ],
    },
    comment2,
    ]);
  });
  it('unlike comment', () => {
    const [comment, comment2] = mockComments;
    const initialStateWithTwoComments = [comment, comment2];
    const userLike = comment.likedUsers![0];
    expect(CommentsReducer(initialStateWithTwoComments, CommentsActions.updateLike({
      commentId: comment.id,
      like: userLike,
      isLiked: false,
    }))).toEqual([{
      ...comment,
      likedUsers: [],
    },
    comment2,
    ]);
  });
});
