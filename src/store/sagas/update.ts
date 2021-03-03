import {
  all, apply, takeLatest, fork, put,
} from 'typed-redux-saga';
import { container } from '@inversify/config';
import { TYPES } from '@inversify/types';
import { IServices } from '@inversify/interfaces';
import {
  BoardsActions, ColumnsActions, CommentsActions, TodosActions, UpdatesActions,
} from '@store/actions';
import { EnumOperations, IOperation } from '@type/api';
import { PayloadAction } from '@reduxjs/toolkit';

const { updateService } = container.get<IServices>(TYPES.Services);

interface IOperationHandlers {
  insert?: (data: any) => PayloadAction<any>,
  update?: (data: any) => PayloadAction<any>,
  delete?: (data: any) => PayloadAction<any>,
}

function* subscribeOnEntity<T extends IOperation>(
  context: any, subscribeFunction: () => Promise<T>, handlers: IOperationHandlers,
) {
  while (true) {
    const { operation, ...data } = yield* apply(context, subscribeFunction, []);
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

    yield* fork(subscribeOnEntity, updateService, updateService.onBoardsUpdate, {
      insert: BoardsActions.add,
      update: BoardsActions.updateEntity,
      delete: BoardsActions.remove,
    });
    yield* fork(subscribeOnEntity, updateService, updateService.onColumnsUpdate, {
      insert: ColumnsActions.add,
      update: ColumnsActions.updateEntity,
      delete: ColumnsActions.remove,
    });
    yield* fork(subscribeOnEntity, updateService, updateService.onTodosUpdate, {
      insert: TodosActions.add,
      update: TodosActions.updateEntity,
      delete: TodosActions.remove,
    });
    yield* fork(subscribeOnEntity, updateService, updateService.onBoardPositionsUpdate, {
      update: (data) => BoardsActions.setPositions(data.order),
    });
    yield* fork(subscribeOnEntity, updateService, updateService.onColumnPositionsUpdate, {
      insert: (data) => ColumnsActions.setPositionsByBoardId({
        positions: data.order,
        boardId: data.boardId,
      }),
      update: (data) => ColumnsActions.setPositionsByBoardId({
        positions: data.order,
        boardId: data.boardId,
      }),
    });
    yield* fork(subscribeOnEntity, updateService, updateService.onTodoPositionsUpdate, {
      insert: (data) => TodosActions.setPositionsByColumnId({
        positions: data,
        columnId: data.columnId,
      }),
      update: (data) => TodosActions.setPositionsByColumnId({
        positions: data.order,
        columnId: data.columnId,
      }),
    });
    yield* fork(subscribeOnEntity, updateService, updateService.onCommentsUpdate, {
      insert: CommentsActions.add,
      update: CommentsActions.updateText,
      delete: CommentsActions.remove,
    });
  } catch (error) {
    console.error(error);
  }
}

export function* watchUpdate() {
  yield all([
    takeLatest(UpdatesActions.subscribe, subscribeOnUpdatesWorker),
  ]);
}
