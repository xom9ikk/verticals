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
  .addCase(TodosActions.updateTitle, (draft, action) => {
    const { id, title } = action.payload;
    draft.entities[draft.entities.findIndex((todo) => todo.id === id)].title = title;
  })
  .addCase(TodosActions.updateDescription, (draft, action) => {
    const { id, description } = action.payload;
    draft.entities[draft.entities.findIndex((todo) => todo.id === id)].description = description;
  })
  .addCase(TodosActions.updateCompleteStatus, (draft, action) => {
    const { id, status } = action.payload;
    draft.entities[draft.entities.findIndex((todo) => todo.id === id)].status = status;
  })
  .addCase(TodosActions.updateColor, (draft, action) => {
    const { id, color } = action.payload;
    draft.entities[draft.entities.findIndex((todo) => todo.id === id)].color = color;
  })
  .addCase(TodosActions.updateIsArchive, (draft, action) => {
    const { id, isArchived } = action.payload;
    draft.entities[draft.entities.findIndex((todo) => todo.id === id)].isArchived = isArchived;
  })
  .addCase(TodosActions.updateNotificationEnabled, (draft, action) => {
    const { id, isNotificationsEnabled } = action.payload;
    draft.entities[draft.entities.findIndex((todo) => todo.id === id)].isNotificationsEnabled = isNotificationsEnabled;
  })
  .addCase(TodosActions.add, (draft, action) => {
    const { id, columnId } = action.payload;

    draft.entities.push(action.payload);
    if (!draft.positions[columnId]) {
      draft.positions[columnId] = [];
    }
    draft.positions[columnId].push(id);
  })
  .addCase(TodosActions.insertInPosition, (draft, action) => {
    const { position, entity } = action.payload;

    draft.entities.push(entity);
    draft.positions[entity.columnId].splice(position, 0, entity.id);
  })
  .addCase(TodosActions.remove, (draft, action) => {
    const { id } = action.payload;

    const entityIndex = draft.entities.findIndex((column) => column.id === id);
    const { columnId } = draft.entities[entityIndex]; // TODO: try move below
    if (entityIndex !== -1) draft.entities.splice(entityIndex, 1);

    const positionIndex = draft.positions[columnId].findIndex((todoId) => todoId === id);
    if (positionIndex !== -1) draft.positions[columnId].splice(positionIndex, 1);
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
  .addCase(TodosActions.updatePosition, (draft, action) => {
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
