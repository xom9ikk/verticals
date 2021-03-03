import {
  ITodos,
} from '@type/entities';
import { createReducer } from '@reduxjs/toolkit';
import { TEMP_ID } from '@/constants';
import { TodosActions } from '../actions';

const initialState: ITodos = {
  entities: [],
  positions: {},
};

export const TodosReducer = createReducer(initialState, (builder) => builder
  .addCase(TodosActions.setAll, (state, action) => action.payload)
  .addCase(TodosActions.setPositionsByColumnId, (draft, action) => {
    const { columnId, positions } = action.payload;
    draft.positions[columnId] = positions;
  })
  .addCase(TodosActions.updateEntity, (draft, action) => {
    const { id } = action.payload;
    const index = draft.entities.findIndex((todo) => todo.id === id);
    draft.entities[index] = {
      ...draft.entities[index],
      ...action.payload,
    };
  })
  .addCase(TodosActions.add, (draft, action) => {
    const { id, columnId } = action.payload;

    if (!draft.positions[columnId]) {
      draft.positions[columnId] = [];
    }

    const isAlreadyExistId = draft.positions[columnId].includes(id);
    if (!isAlreadyExistId) {
      draft.entities.push(action.payload);
      draft.positions[columnId].push(id);
    }
  })
  .addCase(TodosActions.insertInPosition, (draft, action) => {
    const { position, entity } = action.payload;
    const isAlreadyExistId = draft.positions[entity.columnId].includes(entity.id);
    if (!isAlreadyExistId) {
      draft.entities.push(entity);
      draft.positions[entity.columnId].splice(position, 0, entity.id);
    }
  })
  .addCase(TodosActions.remove, (draft, action) => {
    const { id } = action.payload;

    const entityIndex = draft.entities.findIndex((column) => column.id === id);
    if (entityIndex !== -1) {
      const { columnId } = draft.entities[entityIndex];
      draft.entities.splice(entityIndex, 1);

      const positionIndex = draft.positions[columnId]?.findIndex((todoId) => todoId === id);
      if (positionIndex !== -1) draft.positions[columnId]?.splice(positionIndex, 1);
    }
  })
  .addCase(TodosActions.drawBelow, (draft, action) => {
    const { belowId, columnId } = action.payload;

    const positionIndex = draft.positions[columnId].findIndex((todoId) => todoId === belowId);

    draft.entities.push({
      id: TEMP_ID,
      columnId,
      belowId,
      title: '',
      commentsCount: 0,
      imagesCount: 0,
      attachmentsCount: 0,
    });

    draft.positions[columnId].splice(positionIndex + 1, 0, TEMP_ID);
  })
  .addCase(TodosActions.move, (draft, action) => {
    const {
      columnId, sourcePosition, destinationPosition, targetColumnId,
    } = action.payload;

    if (targetColumnId) {
      const todoId = draft.positions[columnId][sourcePosition];
      draft.entities[draft.entities.findIndex((todo) => todo.id === todoId)].columnId = targetColumnId;
      draft.positions[columnId].splice(sourcePosition, 1);
      if (draft.positions[targetColumnId]) {
        draft.positions[targetColumnId].splice(destinationPosition, 0, todoId);
      } else {
        draft.positions[targetColumnId] = [];
        draft.positions[targetColumnId].push(todoId);
      }
    } else {
      draft.positions[columnId].splice(destinationPosition, 0, draft.positions[columnId].splice(sourcePosition, 1)[0]);
    }
  })
  .addCase(TodosActions.removeTemp, (draft) => {
    const entityIndex = draft.entities.findIndex((todo) => todo.id === TEMP_ID);
    if (entityIndex !== -1) {
      const { columnId } = draft.entities[entityIndex];
      draft.entities.splice(entityIndex, 1);

      const positionIndex = draft.positions[columnId].findIndex((todoId) => todoId === TEMP_ID);
      if (positionIndex !== -1) draft.positions[columnId].splice(positionIndex, 1);
    }
  }));
