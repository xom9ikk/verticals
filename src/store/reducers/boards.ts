import { createReducer } from '@reduxjs/toolkit';
import { EnumTodoType, IBoard, IBoards } from '@/types/entities';
import { BoardsActions } from '@/store/actions';
import { DEFAULT_BOARD_ICON } from '@/constants';

const initialState: IBoards = [];
export const BoardsReducer = createReducer(initialState, (builder) => builder
  .addCase(BoardsActions.setAll, (state, action) => action.payload)
  .addCase(BoardsActions.add, (state, action) => { state.push(action.payload); })
  .addCase(BoardsActions.insertInPosition, (state, action) => {
    const { position } = action.payload;
    const { belowId, ...newBoard } = action.payload;
    const boards: IBoards = [...state].sort((a, b) => a.position - b.position);
    const spliceIndex = boards.findIndex((board: IBoard) => board.position === position);
    const normalizedSpliceIndex = spliceIndex === -1 ? boards.length : spliceIndex;
    boards.splice(normalizedSpliceIndex, 0, newBoard);
    return boards.map((board: IBoard, index) => ({ ...board, position: index }));
  })
  .addCase(BoardsActions.updateTitle, (state, action) => (
    state.map((board: IBoard) => (board.id === action.payload.id ? {
      ...board,
      title: action.payload.title,
    } : board))))
  .addCase(BoardsActions.updateDescription, (state, action) => (
    state.map((board: IBoard) => (board.id === action.payload.id ? {
      ...board,
      description: action.payload.description,
    } : board))))
  .addCase(BoardsActions.updatePosition, (state, action) => {
    const { sourcePosition, destinationPosition } = action.payload;
    const boards = [...state];
    const sourceBoard = state.filter((board) => board.position === sourcePosition)[0];
    boards.splice(sourcePosition, 1);
    boards.splice(destinationPosition, 0, { ...sourceBoard, position: destinationPosition });
    return boards.map((board, index) => ({ ...board, position: index }));
  })
  .addCase(BoardsActions.updateColor, (state, action) => (
    state.map((board: IBoard) => (board.id === action.payload.id ? {
      ...board,
      color: action.payload.color,
    } : board))))
  .addCase(BoardsActions.updateCardType, (state, action) => (
    state.map((board: IBoard) => (board.id === action.payload.id ? {
      ...board,
      cardType: action.payload.cardType,
    } : board))))
  .addCase(BoardsActions.updateIcon, (state, action) => (
    state.map((board: IBoard) => (board.id === action.payload.id ? {
      ...board,
      icon: action.payload.icon,
    } : board))))
  .addCase(BoardsActions.remove, (state, action) => state
    .filter((board: IBoard) => board.id !== action.payload.id)
    .map((board: IBoard, index) => ({
      ...board,
      position: index,
    })))
  .addCase(BoardsActions.drawBelow, (state, action) => {
    const { belowId } = action.payload;
    const boards = [...state].sort((a, b) => a.position - b.position);
    const spliceIndex = boards.findIndex((board: IBoard) => board.id === belowId);
    boards.splice(spliceIndex + 1, 0, {
      id: 0,
      belowId,
      position: spliceIndex,
      title: '',
      icon: DEFAULT_BOARD_ICON,
      cardType: EnumTodoType.Checkboxes,
    });
    return boards.map((board: IBoard, index) => ({ ...board, position: index }));
  })
  .addCase(BoardsActions.removeTemp, (state) => (
    state.filter((board: IBoard) => board.id !== 0).map((board: IBoard, index) => ({
      ...board,
      position: index,
    })))));
