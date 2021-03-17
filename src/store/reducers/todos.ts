import {
  ITodos,
} from '@type/entities';
import { createReducer } from '@reduxjs/toolkit';
import { TEMP_ID } from '@/constants';
import { TodosActions } from '../actions';

export const initialState: ITodos = {
  entities: [],
  positions: {},
};

export const TodosReducer = createReducer(initialState, (builder) => builder
  .addCase(TodosActions.setAll, (state, action) => action.payload)
  .addCase(TodosActions.setPositionsByHeadingId, (draft, action) => {
    const { headingId, positions } = action.payload;
    draft.positions[headingId] = positions;
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
    const { id, headingId } = action.payload;

    if (!draft.positions[headingId]) {
      draft.positions[headingId] = [];
    }

    const isAlreadyExistId = draft.positions[headingId].includes(id);
    if (!isAlreadyExistId) {
      draft.entities.push(action.payload);
      draft.positions[headingId].push(id);
    }
  })
  .addCase(TodosActions.insertInPosition, (draft, action) => {
    const { position, entity } = action.payload;
    const isAlreadyExistId = draft.positions[entity.headingId].includes(entity.id);
    if (!isAlreadyExistId) {
      draft.entities.push(entity);
      draft.positions[entity.headingId].splice(position, 0, entity.id);
    }
  })
  .addCase(TodosActions.remove, (draft, action) => {
    const { id } = action.payload;

    const entityIndex = draft.entities.findIndex((column) => column.id === id);
    if (entityIndex !== -1) {
      const { headingId } = draft.entities[entityIndex];
      draft.entities.splice(entityIndex, 1);

      const positionIndex = draft.positions[headingId]?.findIndex((todoId) => todoId === id);
      if (positionIndex !== -1) draft.positions[headingId]?.splice(positionIndex, 1);
    }
  })
  .addCase(TodosActions.drawBelow, (draft, action) => {
    const { belowId, headingId } = action.payload;

    const positionIndex = draft.positions[headingId].findIndex((todoId) => todoId === belowId);

    draft.entities.push({
      id: TEMP_ID,
      headingId,
      belowId,
      title: '',
      commentsCount: 0,
      imagesCount: 0,
      attachmentsCount: 0,
    });

    draft.positions[headingId].splice(positionIndex + 1, 0, TEMP_ID);
  })
  .addCase(TodosActions.move, (draft, action) => {
    const {
      headingId, sourcePosition, destinationPosition, targetHeadingId,
    } = action.payload;

    if (targetHeadingId) {
      const todoId = draft.positions[headingId][sourcePosition];
      draft.entities[draft.entities.findIndex((todo) => todo.id === todoId)].headingId = targetHeadingId;
      draft.positions[headingId].splice(sourcePosition, 1);
      if (draft.positions[targetHeadingId]) {
        draft.positions[targetHeadingId].splice(destinationPosition, 0, todoId);
      } else {
        draft.positions[targetHeadingId] = [];
        draft.positions[targetHeadingId].push(todoId);
      }
    } else {
      draft.positions[headingId]
        .splice(destinationPosition, 0, draft.positions[headingId].splice(sourcePosition, 1)[0]);
    }
  })
  .addCase(TodosActions.removeTemp, (draft) => {
    const entityIndex = draft.entities.findIndex((todo) => todo.id === TEMP_ID);
    if (entityIndex !== -1) {
      const { headingId } = draft.entities[entityIndex];
      draft.entities.splice(entityIndex, 1);

      const positionIndex = draft.positions[headingId].findIndex((todoId) => todoId === TEMP_ID);
      if (positionIndex !== -1) draft.positions[headingId].splice(positionIndex, 1);
    }
  }));
