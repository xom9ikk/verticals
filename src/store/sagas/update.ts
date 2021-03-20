import {
  all, apply, takeLatest, fork, put, select,
} from 'typed-redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import {
  BoardsActions,
  ColumnsActions,
  HeadingsActions,
  TodosActions,
  CommentsActions,
  UpdatesActions,
} from '@store/actions';
import {
  EnumOperations, IBoardPositionsUpdateData,
  IBoardUpdateData,
  IColumnPositionsUpdateData,
  IHeadingPositionsUpdateData,
  IColumnUpdateData, ICommentUpdateData,
  ITodoPositionsUpdateData, ITodoUpdateData,
  IUpdateData, IHeadingUpdateData,
} from '@type/api';
import { IUpdateService } from '@inversify/interfaces/services';
import { getIsSearchMode } from '@store/selectors';

interface IOperationHandlers<T> {
  insert?: (data: T) => PayloadAction<any>,
  update?: (data: T) => PayloadAction<any>,
  delete?: (data: T) => PayloadAction<any>,
}

export function* subscribeOnEntity<T>(
  context: any,
  subscribeFunction: () => Promise<IUpdateData<T>>,
  handlers: IOperationHandlers<T>,
) {
  while (true) {
    const { operation, data } = yield* apply(context, subscribeFunction, []);
    const isSearchMode = yield* select(getIsSearchMode);
    if (isSearchMode) {
      // eslint-disable-next-line no-continue
      continue;
    }
    // console.log('>>>>update', operation, data);
    switch (operation) {
      case EnumOperations.Insert: {
        if (handlers.insert) {
          yield* put(handlers.insert(data));
        }
        break;
      }
      case EnumOperations.Update: {
        if (handlers.update) {
          yield* put(handlers.update(data));
        }
        break;
      }
      case EnumOperations.Delete: {
        if (handlers.delete) {
          yield* put(handlers.delete(data));
        }
        break;
      }
      default: break;
    }
  }
}

function* subscribeOnUpdatesWorker(updateService: IUpdateService) {
  try {
    yield* apply(updateService, updateService.openChannel, []);

    yield* fork(() => subscribeOnEntity<IBoardUpdateData>(
      updateService,
      updateService.onBoardsUpdate, {
        insert: BoardsActions.add,
        update: BoardsActions.updateEntity,
        delete: BoardsActions.remove,
      },
    ));
    yield* fork(() => subscribeOnEntity<IColumnUpdateData>(
      updateService,
      updateService.onColumnsUpdate, {
        insert: ColumnsActions.add,
        update: ColumnsActions.updateEntity,
        delete: ColumnsActions.remove,
      },
    ));
    yield* fork(() => subscribeOnEntity<IHeadingUpdateData>(
      updateService,
      updateService.onHeadingsUpdate, {
        insert: HeadingsActions.add,
        update: HeadingsActions.updateEntity,
        delete: HeadingsActions.remove,
      },
    ));
    yield* fork(() => subscribeOnEntity<ITodoUpdateData>(
      updateService, updateService.onTodosUpdate, {
        insert: TodosActions.add,
        update: TodosActions.updateEntity,
        delete: TodosActions.remove,
      },
    ));
    yield* fork(() => subscribeOnEntity<IBoardPositionsUpdateData>(
      updateService,
      updateService.onBoardPositionsUpdate, {
        update: (data) => BoardsActions.setPositions(data.order),
      },
    ));
    yield* fork(() => subscribeOnEntity<IColumnPositionsUpdateData>(
      updateService,
      updateService.onColumnPositionsUpdate, {
        insert: (data) => ColumnsActions.setPositionsByBoardId({
          positions: data.order,
          boardId: data.boardId,
        }),
        update: (data) => ColumnsActions.setPositionsByBoardId({
          positions: data.order,
          boardId: data.boardId,
        }),
      },
    ));
    yield* fork(() => subscribeOnEntity<IHeadingPositionsUpdateData>(
      updateService,
      updateService.onHeadingPositionsUpdate, {
        insert: (data) => HeadingsActions.setPositionsByColumnId({
          positions: data.order,
          columnId: data.columnId,
        }),
        update: (data) => HeadingsActions.setPositionsByColumnId({
          positions: data.order,
          columnId: data.columnId,
        }),
      },
    ));
    yield* fork(() => subscribeOnEntity<ITodoPositionsUpdateData>(
      updateService,
      updateService.onTodoPositionsUpdate, {
        insert: (data) => TodosActions.setPositionsByHeadingId({
          positions: data.order,
          headingId: data.headingId,
        }),
        update: (data) => TodosActions.setPositionsByHeadingId({
          positions: data.order,
          headingId: data.headingId,
        }),
      },
    ));
    yield* fork(() => subscribeOnEntity<ICommentUpdateData>(
      updateService,
      updateService.onCommentsUpdate, {
        insert: CommentsActions.add,
        update: CommentsActions.updateText,
        delete: CommentsActions.remove,
      },
    ));
  } catch (error) {
    console.error(error);
  }
}

export function* watchUpdate(updateService: IUpdateService) {
  yield all([
    takeLatest(UpdatesActions.effect.subscribe, subscribeOnUpdatesWorker, updateService),
  ]);
}
