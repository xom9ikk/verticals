import { createReducer } from '@reduxjs/toolkit';
import { ColumnsActions } from '@store/actions';
import { TEMP_ID } from '@/constants';
import { IColumns } from '@type/entities';

const initialState: IColumns = {
  entities: [],
  positions: {},
};

export const ColumnsReducer = createReducer(initialState, (builder) => builder
  .addCase(ColumnsActions.setAll, (state, action) => action.payload)
  .addCase(ColumnsActions.update, (draft, action) => {
    const { id } = action.payload;
    const index = draft.entities.findIndex((column) => column.id === id);
    draft.entities[index] = {
      ...draft.entities[index],
      ...action.payload,
    };
  })
  // .addCase(ColumnsActions.updateTitle, (draft, action) => {
  //   const { id, title } = action.payload;
  //   draft.entities[draft.entities.findIndex((column) => column.id === id)].title = title;
  // })
  // .addCase(ColumnsActions.updateDescription, (draft, action) => {
  //   const { id, description } = action.payload;
  //   draft.entities[draft.entities.findIndex((column) => column.id === id)].description = description;
  // })
  // .addCase(ColumnsActions.updateColor, (draft, action) => {
  //   const { id, color } = action.payload;
  //   draft.entities[draft.entities.findIndex((column) => column.id === id)].color = color;
  // })
  // .addCase(ColumnsActions.updateIsCollapsed, (draft, action) => {
  //   const { id, isCollapsed } = action.payload;
  //   draft.entities[draft.entities.findIndex((column) => column.id === id)].isCollapsed = isCollapsed;
  // })
  .addCase(ColumnsActions.add, (draft, action) => {
    const { id, boardId } = action.payload;

    draft.entities.push(action.payload);
    if (!draft.positions[boardId]) {
      draft.positions[boardId] = [];
    }
    draft.positions[boardId].push(id);
  })
  .addCase(ColumnsActions.updatePosition, (draft, action) => {
    const { boardId, sourcePosition, destinationPosition } = action.payload;
    draft.positions[boardId].splice(destinationPosition, 0, draft.positions[boardId].splice(sourcePosition, 1)[0]);
  })
  .addCase(ColumnsActions.insertInPosition, (draft, action) => {
    const { position, entity } = action.payload;

    draft.entities.push(entity);
    draft.positions[entity.boardId].splice(position, 0, entity.id);
  })
  .addCase(ColumnsActions.remove, (draft, action) => {
    const { id } = action.payload;

    const entityIndex = draft.entities.findIndex((column) => column.id === id);
    const { boardId } = draft.entities[entityIndex]; // TODO: try move below
    if (entityIndex !== -1) draft.entities.splice(entityIndex, 1);

    const positionIndex = draft.positions[boardId].findIndex((columnId) => columnId === id);
    if (positionIndex !== -1) draft.positions[boardId].splice(positionIndex, 1);
  })
  .addCase(ColumnsActions.drawBelow, (draft, action) => {
    const { belowId, boardId } = action.payload;

    const positionIndex = draft.positions[boardId].findIndex((columnId) => columnId === belowId);

    draft.entities.push({
      id: TEMP_ID,
      boardId,
      belowId,
      title: '',
    });

    draft.positions[boardId].splice(positionIndex + 1, 0, TEMP_ID);
  })
  .addCase(ColumnsActions.removeTemp, (draft) => {
    const entityIndex = draft.entities.findIndex((column) => column.id === TEMP_ID);
    if (entityIndex !== -1) {
      const { boardId } = draft.entities[entityIndex];
      draft.entities.splice(entityIndex, 1);

      const positionIndex = draft.positions[boardId].findIndex((columnId) => columnId === TEMP_ID);
      if (positionIndex !== -1) draft.positions[boardId].splice(positionIndex, 1);
    }
  })
  .addCase(ColumnsActions.reverseOrder, (draft, action) => {
    const { boardId } = action.payload;
    draft.positions[boardId].reverse();
  }));
