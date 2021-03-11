import {
  all, apply, takeLatest, fork, put,
} from 'typed-redux-saga';
import { PayloadAction } from '@reduxjs/toolkit';
import { container } from '@inversify/config';
import { TYPES } from '@inversify/types';
import { IServices } from '@inversify/interfaces';
import {
  BoardsActions, ColumnsActions, CommentsActions, TodosActions, UpdatesActions,
} from '@store/actions';
import {
  EnumOperations, IBoardPositionsUpdateData,
  IBoardUpdateData,
  IColumnPositionsUpdateData,
  IColumnUpdateData, ICommentUpdateData,
  ITodoPositionsUpdateData, ITodoUpdateData,
  IUpdateData,
} from '@type/api';

const { updateService } = container.get<IServices>(TYPES.Services);

interface IOperationHandlers<T> {
  insert?: (data: T) => PayloadAction<any>,
  update?: (data: T) => PayloadAction<any>,
  delete?: (data: T) => PayloadAction<any>,
}

function* subscribeOnEntity<T>(
  context: any,
  subscribeFunction: () => Promise<IUpdateData<T>>,
  handlers: IOperationHandlers<T>,
) {
  while (true) {
    const { operation, data } = yield* apply(context, subscribeFunction, []);
    console.log('>>>>update', data);
    switch (operation) {
      case EnumOperations.Insert: {
        if (handlers.insert) {
          yield put(handlers.insert(data));
        }
        break;
      }
      case EnumOperations.Update: {
        if (handlers.update) {
          yield put(handlers.update(data));
        }
        break;
      }
      case EnumOperations.Delete: {
        if (handlers.delete) {
          yield put(handlers.delete(data));
        }
        break;
      }
      default: break;
    }
  }
}

function* subscribeOnUpdatesWorker() {
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
    yield* fork(() => subscribeOnEntity<ITodoPositionsUpdateData>(
      updateService,
      updateService.onTodoPositionsUpdate, {
        insert: (data) => TodosActions.setPositionsByColumnId({
          positions: data.order,
          columnId: data.columnId,
        }),
        update: (data) => TodosActions.setPositionsByColumnId({
          positions: data.order,
          columnId: data.columnId,
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

export function* watchUpdate() {
  yield all([
    takeLatest(UpdatesActions.effect.subscribe, subscribeOnUpdatesWorker),
  ]);
}
