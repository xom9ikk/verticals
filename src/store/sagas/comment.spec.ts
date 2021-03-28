import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';

import { useAlert } from '@use/alert';
import { CommentAttachmentsActions, CommentsActions } from '@store/actions';
import { CommentService } from '@services/comment';
import { watchComment } from '@store/sagas/comment';
import {
  getAvatarUrl, getName, getSurname, getUsername,
} from '@store/selectors';

// @ts-ignore
const commentService = new CommentService();
const { show, ALERT_TYPES } = useAlert();

const mockComment = {
  id: 1,
  userId: 11,
  todoId: 13,
  subTodoId: 14,
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
};

describe('Comment saga flow', () => {
  it('fetch by todo id', () => {
    const mockData = {
      comments: [mockComment],
    };
    const payload = {
      todoId: mockComment.todoId,
    };

    return expectSaga(watchComment, commentService)
      .provide([
        [matchers.apply.fn(commentService.getByTodoId), {
          data: mockData,
        }],
      ])
      .dispatch(CommentsActions.effect.fetchByTodoId(payload))
      .apply(commentService, commentService.getByTodoId, [payload])
      .put(CommentsActions.setAll(mockData.comments))
      .silentRun();
  });
  it('fetch by sub todo id', () => {
    const mockData = {
      comments: [mockComment],
    };
    const payload = {
      subTodoId: mockComment.subTodoId,
    };

    return expectSaga(watchComment, commentService)
      .provide([
        [matchers.apply.fn(commentService.getBySubTodoId), {
          data: mockData,
        }],
      ])
      .dispatch(CommentsActions.effect.fetchBySubTodoId(payload))
      .apply(commentService, commentService.getBySubTodoId, [payload])
      .put(CommentsActions.setAll(mockData.comments))
      .silentRun();
  });
  it('create', () => {
    const mockData = {
      commentId: mockComment.id,
    };

    const payload = {
      todoId: mockComment.todoId,
      text: mockComment.text,
      replyCommentId: mockComment.replyCommentId,
    };

    return expectSaga(watchComment, commentService)
      .provide([
        [matchers.apply.fn(commentService.create), {
          data: mockData,
        }],
      ])
      .dispatch(CommentsActions.effect.create(payload))
      .apply(commentService, commentService.create, [payload])
      .put(CommentsActions.add({
        ...payload,
        id: mockData.commentId,
      }))
      .call(show, 'Comment', 'Comment added successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('create with files', () => {
    const mockData = {
      commentId: mockComment.id,
    };

    const payload = {
      todoId: mockComment.todoId,
      text: mockComment.text,
      replyCommentId: mockComment.replyCommentId,
    };
    const files = [1, 2, 3] as any;

    return expectSaga(watchComment, commentService)
      .provide([
        [matchers.apply.fn(commentService.create), {
          data: mockData,
        }],
      ])
      .dispatch(CommentsActions.effect.create({
        ...payload,
        files,
      }))
      .apply(commentService, commentService.create, [payload])
      .put(CommentsActions.add({
        ...payload,
        id: mockData.commentId,
      }))
      .put(CommentAttachmentsActions.effect.uploadFiles({
        commentId: mockData.commentId,
        files,
      }))
      .call(show, 'Comment', 'Comment added successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('remove', () => {
    const payload = {
      id: 77,
    };

    return expectSaga(watchComment, commentService)
      .provide([
        [matchers.apply.fn(commentService.remove), undefined],
      ])
      .dispatch(CommentsActions.effect.remove(payload))
      .apply(commentService, commentService.remove, [payload])
      .put(CommentsActions.remove(payload))
      .call(show, 'Comment', 'Comment removed successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('update', () => {
    const payload = {
      id: 77,
      text: 'New text',
    };

    return expectSaga(watchComment, commentService)
      .provide([
        [matchers.apply.fn(commentService.update), undefined],
      ])
      .dispatch(CommentsActions.effect.updateText(payload))
      .apply(commentService, commentService.update, [payload])
      .put(CommentsActions.updateText(payload))
      .call(show, 'Comment', 'Comment updated successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('add like', () => {
    const payload = {
      commentId: mockComment.id,
    };

    const [userLike] = mockComment.likedUsers;
    return expectSaga(watchComment, commentService)
      .provide([
        [matchers.apply.fn(commentService.addLike), undefined],
        [matchers.select(getName), userLike.name],
        [matchers.select(getSurname), userLike.surname],
        [matchers.select(getUsername), userLike.username],
        [matchers.select(getAvatarUrl), userLike.avatar],
      ])
      .dispatch(CommentsActions.effect.addLike(payload))
      .apply(commentService, commentService.addLike, [payload])
      .put(CommentsActions.updateLike({
        commentId: mockComment.id,
        like: userLike,
        isLiked: true,
      }))
      .silentRun();
  });
  it('remove like', () => {
    const payload = {
      commentId: mockComment.id,
    };

    const [userLike] = mockComment.likedUsers;
    return expectSaga(watchComment, commentService)
      .provide([
        [matchers.apply.fn(commentService.removeLike), undefined],
        [matchers.select(getName), userLike.name],
        [matchers.select(getSurname), userLike.surname],
        [matchers.select(getUsername), userLike.username],
        [matchers.select(getAvatarUrl), userLike.avatar],
      ])
      .dispatch(CommentsActions.effect.removeLike(payload))
      .apply(commentService, commentService.removeLike, [payload])
      .put(CommentsActions.updateLike({
        commentId: mockComment.id,
        like: userLike,
        isLiked: false,
      }))
      .silentRun();
  });
});
