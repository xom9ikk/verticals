import { handleActions } from 'redux-actions';
import { EnumTodoType, IBoard, IBoards } from '@/types';
import { BoardsActions } from '../actions';

const initialState: IBoards = [];

export const BoardsReducer = handleActions<IBoards, any>({
  [BoardsActions.Type.SET_ALL]:
        (state, action) => ([...action.payload]),
  [BoardsActions.Type.UPDATE_TITLE]:
      (state, action) => (state.map((board: IBoard) => (board.id === action.payload.id
        ? {
          ...board,
          title: action.payload.title,
        }
        : board))),
  [BoardsActions.Type.UPDATE_DESCRIPTION]:
      (state, action) => (state.map((board: IBoard) => (board.id === action.payload.id
        ? {
          ...board,
          description: action.payload.description,
        }
        : board))),
  [BoardsActions.Type.ADD]:
      (state, action) => ([...state, {
        id: Math.random().toString(),
        position: state.length,
        ...action.payload,
      }]),
  [BoardsActions.Type.INSERT_IN_POSITION]:
      (state, action) => {
        const { position } = action.payload;
        const boards = [...state].sort((a, b) => a.position - b.position);
        const spliceIndex = boards.findIndex((board: IBoard) => board.position === position);
        const normalizedSpliceIndex = spliceIndex === -1 ? boards.length : spliceIndex;
        boards.splice(normalizedSpliceIndex, 0, action.payload);
        return boards.map((board: IBoard, index) => ({
          ...board,
          position: index,
        }));
      },
  [BoardsActions.Type.UPDATE_POSITION]:
        (state, action) => {
          const { sourcePosition, destinationPosition } = action.payload;
          const boards = [...state];
          const sourceBoard = state
            .filter((board) => board.position === sourcePosition)[0];
          boards.splice(sourcePosition, 1);
          boards.splice(destinationPosition, 0, {
            ...sourceBoard, position: destinationPosition,
          });
          return boards.map((board, index) => ({
            ...board,
            position: index,
          }));
        },
  [BoardsActions.Type.UPDATE_COLOR]:
        (state, action) => (state.map((board: IBoard) => (board.id === action.payload.id
          ? {
            ...board,
            color: action.payload.color,
          }
          : board))),
  [BoardsActions.Type.RESET_COLOR]:
        (state, action) => (state.map((board: IBoard) => (board.id === action.payload.id
          ? {
            ...board,
            color: undefined,
          }
          : board))),
  [BoardsActions.Type.UPDATE_CARD_TYPE]:
        (state, action) => (state.map((board: IBoard) => (board.id === action.payload.id
          ? {
            ...board,
            cardType: action.payload.cardType,
          }
          : board))),
  [BoardsActions.Type.REMOVE]:
        (state, action) => state.filter((board: IBoard) => board.id !== action.payload.id),
  [BoardsActions.Type.DRAW_BELOW]:
        (state, action) => {
          const { belowId } = action.payload;
          const boards = [...state].sort((a, b) => a.position - b.position);
          const spliceIndex = boards.findIndex((board: IBoard) => board.id === belowId);
          boards.splice(spliceIndex + 1, 0, {
            id: 0,
            belowId,
            position: spliceIndex,
            title: '',
            icon: '/assets/svg/board/item.svg',
            cardType: EnumTodoType.Checkboxes,
          });
          return boards.map((board: IBoard, index) => ({
            ...board,
            position: index,
          }));
        },
  [BoardsActions.Type.REMOVE_TEMP]:
        (state) => (state
          .filter((board: IBoard) => board.id !== 0)
          .map((board: IBoard, index) => ({
            ...board,
            position: index,
          }))),
}, initialState);
