import {
  ISubTodos,
} from '@type/entities';
import { createReducer } from '@reduxjs/toolkit';
import { SUB_TODO_ON_TOP, TEMP_ID } from '@/constants';
import { SubTodosActions } from '../actions';

export const initialState: ISubTodos = {
  entities: [],
  positions: {},
};

export const SubTodosReducer = createReducer(initialState, (builder) => builder
  .addCase(SubTodosActions.setAll, (state, action) => action.payload)
  .addCase(SubTodosActions.setPositionsByTodoId, (draft, action) => {
    const { todoId, positions } = action.payload;
    draft.positions[todoId] = positions;
  })
  .addCase(SubTodosActions.updateEntity, (draft, action) => {
    const { id } = action.payload;
    const index = draft.entities.findIndex((subTodo) => subTodo.id === id);
    draft.entities[index] = {
      ...draft.entities[index],
      ...action.payload,
    };
  })
  .addCase(SubTodosActions.add, (draft, action) => {
    const { id, todoId } = action.payload;

    if (!draft.positions[todoId]) {
      draft.positions[todoId] = [];
    }

    const isAlreadyExistId = draft.positions[todoId].includes(id);
    if (!isAlreadyExistId) {
      draft.entities.push(action.payload);
      draft.positions[todoId].push(id);
    }
  })
  .addCase(SubTodosActions.insertInPosition, (draft, action) => {
    const { position, entity } = action.payload;
    const isAlreadyExistId = draft.positions[entity.todoId].includes(entity.id);
    if (!isAlreadyExistId) {
      draft.entities.push(entity);
      draft.positions[entity.todoId].splice(position, 0, entity.id);
    }
  })
  .addCase(SubTodosActions.remove, (draft, action) => {
    const { id } = action.payload;

    const entityIndex = draft.entities.findIndex((column) => column.id === id);
    if (entityIndex !== -1) {
      const { todoId } = draft.entities[entityIndex];
      draft.entities.splice(entityIndex, 1);

      const positionIndex = draft.positions[todoId]?.findIndex((subTodoId) => subTodoId === id);
      if (positionIndex !== -1) draft.positions[todoId]?.splice(positionIndex, 1);
    }
  })
  .addCase(SubTodosActions.drawBelow, (draft, action) => {
    const { belowId, todoId } = action.payload;

    const positionIndex = draft.positions[todoId].findIndex((subTodoId) => subTodoId === belowId);

    draft.entities.push({
      id: TEMP_ID,
      todoId,
      belowId,
      title: '',
      commentsCount: 0,
      imagesCount: 0,
      attachmentsCount: 0,
    });

    draft.positions[todoId].splice(positionIndex + 1, 0, TEMP_ID);
  })
  .addCase(SubTodosActions.drawOnTop, (draft, action) => {
    const { todoId } = action.payload;

    draft.entities.push({
      id: TEMP_ID,
      todoId,
      belowId: SUB_TODO_ON_TOP,
      title: '',
      commentsCount: 0,
      imagesCount: 0,
      attachmentsCount: 0,
    });

    const positionIndex = 0;
    if (draft.positions[todoId]) {
      draft.positions[todoId].splice(positionIndex, 0, TEMP_ID);
    } else {
      draft.positions[todoId] = [];
      draft.positions[todoId].push(TEMP_ID);
    }
  })
  .addCase(SubTodosActions.move, (draft, action) => {
    const {
      todoId, sourcePosition, destinationPosition, targetTodoId,
    } = action.payload;

    if (targetTodoId) {
      const subTodoId = draft.positions[todoId][sourcePosition];
      draft.entities[draft.entities.findIndex((subTodo) => subTodo.id === subTodoId)].todoId = targetTodoId;
      draft.positions[todoId].splice(sourcePosition, 1);
      if (draft.positions[targetTodoId]) {
        draft.positions[targetTodoId].splice(destinationPosition, 0, subTodoId);
      } else {
        draft.positions[targetTodoId] = [];
        draft.positions[targetTodoId].push(subTodoId);
      }
    } else {
      draft.positions[todoId]
        .splice(destinationPosition, 0, draft.positions[todoId].splice(sourcePosition, 1)[0]);
    }
  })
  .addCase(SubTodosActions.removeTemp, (draft) => {
    const entityIndex = draft.entities.findIndex((subTodo) => subTodo.id === TEMP_ID);
    if (entityIndex !== -1) {
      const { todoId } = draft.entities[entityIndex];
      draft.entities.splice(entityIndex, 1);

      const positionIndex = draft.positions[todoId].findIndex((subTodoId) => subTodoId === TEMP_ID);
      if (positionIndex !== -1) draft.positions[todoId].splice(positionIndex, 1);
    }
  }));
