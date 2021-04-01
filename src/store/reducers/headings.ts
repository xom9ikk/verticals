import { createReducer } from '@reduxjs/toolkit';
import { HeadingsActions } from '@store/actions';
import { EnumHeadingType, IHeadings } from '@type/entities';

export const initialState: IHeadings = {
  entities: [],
  positions: {},
};

export const HeadingsReducer = createReducer(initialState, (builder) => builder
  .addCase(HeadingsActions.setAll, (state, action) => action.payload)
  .addCase(HeadingsActions.setPositionsByColumnId, (draft, action) => {
    const { columnId, positions } = action.payload;
    draft.positions[columnId] = positions;
  })
  .addCase(HeadingsActions.updateEntity, (draft, action) => {
    const { id } = action.payload;
    const index = draft.entities.findIndex((column) => column.id === id);
    draft.entities[index] = {
      ...draft.entities[index],
      ...action.payload,
    };
  })
  .addCase(HeadingsActions.add, (draft, action) => {
    const { id, columnId } = action.payload;

    if (!draft.positions[columnId]) {
      draft.positions[columnId] = [];
    }
    const isAlreadyExistId = draft.positions[columnId].includes(id);
    if (!isAlreadyExistId) {
      draft.entities.push(action.payload);
      if (action.payload.type === EnumHeadingType.Custom) {
        draft.positions[columnId].push(id);
      }
    }
  })
  .addCase(HeadingsActions.move, (draft, action) => {
    const {
      columnId, sourcePosition, destinationPosition, targetColumnId,
    } = action.payload;

    if (targetColumnId) {
      const headingId = draft.positions[columnId][sourcePosition];
      draft.entities[draft.entities.findIndex((heading) => heading.id === headingId)].columnId = targetColumnId;
      draft.positions[columnId].splice(sourcePosition, 1);
      if (draft.positions[targetColumnId]) {
        draft.positions[targetColumnId].splice(destinationPosition, 0, headingId);
      } else {
        draft.positions[targetColumnId] = [];
        draft.positions[targetColumnId].push(headingId);
      }
    } else {
      draft.positions[columnId]
        .splice(destinationPosition, 0, draft.positions[columnId].splice(sourcePosition, 1)[0]);
    }
  })
  .addCase(HeadingsActions.insertInPosition, (draft, action) => {
    const { position, entity } = action.payload;
    const isAlreadyExistId = draft.positions[entity.columnId].includes(entity.id);
    if (!isAlreadyExistId) {
      draft.entities.push(entity);
      draft.positions[entity.columnId].splice(position, 0, entity.id);
    }
  })
  .addCase(HeadingsActions.remove, (draft, action) => {
    const { id } = action.payload;

    const entityIndex = draft.entities.findIndex((column) => column.id === id);
    if (entityIndex !== -1) {
      const { columnId } = draft.entities[entityIndex];
      draft.entities.splice(entityIndex, 1);
      const positionIndex = draft.positions[columnId].findIndex((headingId) => headingId === id);
      if (positionIndex !== -1) draft.positions[columnId].splice(positionIndex, 1);
    }
  }));
