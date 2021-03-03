import { createReducer } from '@reduxjs/toolkit';
import { EnumTodoType, IBoards } from '@type/entities';
import { BoardsActions } from '@store/actions';
import { DEFAULT_BOARD_ICON, TEMP_ID } from '@/constants';

const initialState: IBoards = {
  entities: [],
  positions: [],
};

export const BoardsReducer = createReducer(initialState, (builder) => builder
  .addCase(BoardsActions.setAll, (draft, action) => action.payload)
  .addCase(BoardsActions.setPositions, (draft, action) => {
    draft.positions = action.payload;
  })
  .addCase(BoardsActions.updateEntity, (draft, action) => {
    const { id } = action.payload;
    const index = draft.entities.findIndex((board) => board.id === id);
    draft.entities[index] = {
      ...draft.entities[index],
      ...action.payload,
    };
  })
  .addCase(BoardsActions.add, (draft, action) => {
    const { id } = action.payload;

    const isAlreadyExistId = draft.positions.includes(id);
    if (!isAlreadyExistId) {
      draft.entities.push(action.payload);
      draft.positions.push(id);
    }
  })
  .addCase(BoardsActions.move, (draft, action) => {
    const { sourcePosition, destinationPosition } = action.payload;
    draft.positions.splice(destinationPosition, 0, draft.positions.splice(sourcePosition, 1)[0]);
  })
  .addCase(BoardsActions.insertInPosition, (draft, action) => {
    const { entity, position } = action.payload;
    const isAlreadyExistId = draft.positions.includes(entity.id);
    if (!isAlreadyExistId) {
      draft.entities.push(entity);
      draft.positions.splice(position, 0, entity.id);
    }
  })
  .addCase(BoardsActions.remove, (draft, action) => {
    const { id } = action.payload;

    const entityIndex = draft.entities.findIndex((board) => board.id === id);
    if (entityIndex !== -1) {
      draft.entities.splice(entityIndex, 1);

      const positionIndex = draft.positions.findIndex((boardId) => boardId === id);
      if (positionIndex !== -1) draft.positions.splice(positionIndex, 1);
    }
  })
  .addCase(BoardsActions.drawBelow, (draft, action) => {
    const { belowId } = action.payload;
    const positionIndex = draft.positions.findIndex((boardId) => boardId === belowId);

    draft.entities.push({
      id: TEMP_ID,
      belowId,
      title: '',
      icon: DEFAULT_BOARD_ICON,
      cardType: EnumTodoType.Checkboxes,
    });

    draft.positions.splice(positionIndex + 1, 0, TEMP_ID);
  })
  .addCase(BoardsActions.removeTemp, (draft) => {
    const entityIndex = draft.entities.findIndex((board) => board.id === TEMP_ID);
    if (entityIndex !== -1) draft.entities.splice(entityIndex, 1);

    const positionIndex = draft.positions.findIndex((boardId) => boardId === TEMP_ID);
    if (positionIndex !== -1) draft.positions.splice(positionIndex, 1);
  }));
