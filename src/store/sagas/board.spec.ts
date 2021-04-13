import { expectSaga } from 'redux-saga-test-plan';
import * as matchers from 'redux-saga-test-plan/matchers';
import { useAlert } from '@use/alert';
import { redirectTo } from '@router/history';
import { watchBoard } from '@store/sagas/board';
import { BoardsActions, SystemActions } from '@store/actions';
import { BoardService } from '@services/board';
import {
  EnumCardType, EnumColors,
} from '@type/entities';
import { getActiveBoardId, getUsername } from '@store/selectors';
import { useReadableId } from '@use/readableId';

// @ts-ignore
const boardService = new BoardService();
const { show, ALERT_TYPES } = useAlert();
const { toReadableId } = useReadableId();

const mockBoard = {
  id: 1,
  title: 'Title',
  icon: 'path/to/icon',
  cardType: EnumCardType.Checkboxes,
  description: 'Description for board',
  color: EnumColors.Green,
};

describe('Board saga flow', () => {
  it('fetch', () => {
    const mockData = {
      boards: {
        entities: [mockBoard],
        positions: [mockBoard.id],
      },
    };
    const username = 'john.doe';

    const firstBoard = mockData.boards.entities[0];
    const readableBoardId = toReadableId(firstBoard.title, firstBoard.id);

    return expectSaga(watchBoard, boardService)
      .provide([
        [matchers.apply.fn(boardService.getAll), {
          data: mockData,
        }],
        [matchers.select(getActiveBoardId), null],
        [matchers.select(getUsername), username],
      ])
      .dispatch(BoardsActions.effect.fetchAll())
      .apply(boardService, boardService.getAll, [])
      .put(BoardsActions.setAll(mockData.boards))
      .put(SystemActions.setIsLoadedBoards(true))
      .select(getActiveBoardId)
      .select(getUsername)
      .call(redirectTo, `/${username}/${readableBoardId}`)
      .silentRun();
  });
  it('create', () => {
    const mockData = {
      boardId: mockBoard.id,
      position: 7,
    };

    return expectSaga(watchBoard, boardService)
      .provide([
        [matchers.apply.fn(boardService.create), {
          data: mockData,
        }],
      ])
      .dispatch(BoardsActions.effect.create(mockBoard))
      .apply(boardService, boardService.create, [mockBoard])
      .put(BoardsActions.add({
        ...mockBoard,
        id: mockData.boardId,
      }))
      .call(show, 'Board', 'Board created successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('create with below id', () => {
    const mockData = {
      boardId: mockBoard.id,
      position: 7,
    };

    const payload = {
      ...mockBoard,
      belowId: 77,
    };

    return expectSaga(watchBoard, boardService)
      .provide([
        [matchers.apply.fn(boardService.create), {
          data: mockData,
        }],
      ])
      .dispatch(BoardsActions.effect.create(payload))
      .apply(boardService, boardService.create, [payload])
      .put(BoardsActions.removeTemp())
      .put(BoardsActions.insertInPosition({
        entity: {
          ...mockBoard,
          id: mockData.boardId,
        },
        position: mockData.position,
      }))
      .call(show, 'Board', 'Board created successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('remove', () => {
    const payload = {
      id: 77,
    };

    return expectSaga(watchBoard, boardService)
      .provide([
        [matchers.apply.fn(boardService.remove), undefined],
      ])
      .dispatch(BoardsActions.effect.remove(payload))
      .apply(boardService, boardService.remove, [payload])
      .put(BoardsActions.remove(payload))
      .call(show, 'Board', 'Board removed successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('update', () => {
    const payload = {
      id: 77,
      title: 'New Title',
    };

    return expectSaga(watchBoard, boardService)
      .provide([
        [matchers.apply.fn(boardService.update), undefined],
      ])
      .dispatch(BoardsActions.effect.update(payload))
      .apply(boardService, boardService.update, [payload])
      .put(BoardsActions.updateEntity(payload))
      .call(show, 'Board', 'Board updated successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
  it('move', () => {
    const payload = {
      sourcePosition: 0,
      destinationPosition: 2,
    };

    return expectSaga(watchBoard, boardService)
      .provide([
        [matchers.apply.fn(boardService.updatePosition), undefined],
      ])
      .dispatch(BoardsActions.effect.move(payload))
      .apply(boardService, boardService.updatePosition, [payload])
      .put(BoardsActions.move(payload))
      .call(show, 'Board', 'Board position updated successfully', ALERT_TYPES.SUCCESS)
      .silentRun();
  });
});
