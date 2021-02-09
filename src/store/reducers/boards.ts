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
  .addCase(BoardsActions.add, (draft, action) => {
    draft.entities.push(action.payload);
    draft.positions.push(action.payload.id);
  })
  .addCase(BoardsActions.updateTitle, (draft, action) => {
    draft.entities[draft.entities.findIndex((board) => board.id === action.payload.id)].title = action.payload.title;
  })
  .addCase(BoardsActions.updateDescription, (draft, action) => {
    draft.entities[draft.entities.findIndex((board) => board.id === action.payload.id)]
      .description = action.payload.description;
  })
  .addCase(BoardsActions.updateColor, (draft, action) => {
    draft.entities[draft.entities.findIndex((board) => board.id === action.payload.id)]
      .color = action.payload.color;
  })
  .addCase(BoardsActions.updateCardType, (draft, action) => {
    draft.entities[draft.entities.findIndex((board) => board.id === action.payload.id)]
      .cardType = action.payload.cardType;
  })
  .addCase(BoardsActions.updateIcon, (draft, action) => {
    draft.entities[draft.entities.findIndex((board) => board.id === action.payload.id)]
      .icon = action.payload.icon;
  })
  .addCase(BoardsActions.updatePosition, (draft, action) => {
    const { sourcePosition, destinationPosition } = action.payload;
    draft.positions.splice(destinationPosition, 0, draft.positions.splice(sourcePosition, 1)[0]);
  })
  .addCase(BoardsActions.insertInPosition, (draft, action) => {
    const { entity, position } = action.payload;

    draft.entities.splice(position, 0, entity);
    draft.positions.splice(position, 0, entity.id);
  })
  .addCase(BoardsActions.remove, (draft, action) => {
    const { id } = action.payload;

    const entityIndex = draft.entities.findIndex((board) => board.id === id);
    if (entityIndex !== -1) draft.entities.splice(entityIndex, 1);

    const positionIndex = draft.positions.findIndex((boardId) => boardId === id);
    if (positionIndex !== -1) draft.positions.splice(positionIndex, 1);
  })
  .addCase(BoardsActions.drawBelow, (draft, action) => {
    const { belowId } = action.payload;
    const entityIndex = draft.entities.findIndex((board) => board.id === belowId);
    const positionIndex = draft.positions.findIndex((boardId) => boardId === belowId);
    draft.entities.splice(entityIndex + 1, 0, {
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
