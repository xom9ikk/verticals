import { handleActions } from 'redux-actions';
import { BoardsActions } from '../actions';
import { EnumTodoType, IBoard, IBoards } from '../../types';

const initialState: IBoards = [{
  id: 'today',
  icon: '/svg/board/star.svg',
  title: 'Today',
  position: 0,
  cardType: EnumTodoType.Checkboxes,
},
{
  id: 'board-1',
  icon: '/svg/board/item.svg',
  title: 'To reading',
  position: 1,
  cardType: EnumTodoType.Checkboxes,
}, {
  id: 'board-2',
  icon: '/svg/board/item.svg',
  title: 'Technologies etc.',
  position: 2,
  cardType: EnumTodoType.Checkboxes,
}, {
  id: 'board-3',
  icon: '/svg/board/item.svg',
  title: 'Projects',
  position: 3,
  cardType: EnumTodoType.Checkboxes,
}, {
  id: 'board-4',
  icon: '/svg/board/item.svg',
  title: 'Branches',
  position: 4,
  cardType: EnumTodoType.Checkboxes,
}, {
  id: 'board-5',
  icon: '/svg/board/item.svg',
  title: 'Films',
  position: 5,
  cardType: EnumTodoType.Checkboxes,
}, {
  id: 'board-6',
  icon: '/svg/board/item.svg',
  title: 'Buy',
  position: 6,
  cardType: EnumTodoType.Checkboxes,
}, {
  id: 'board-7',
  icon: '/svg/board/item.svg',
  title: 'Books',
  position: 7,
  cardType: EnumTodoType.Checkboxes,
}, {
  id: 'trash',
  icon: '/svg/board/trash.svg',
  title: 'Trash',
  position: 8,
  cardType: EnumTodoType.Checkboxes,
}];

export const BoardsReducer = handleActions<IBoards, any>({
  [BoardsActions.Type.SET_BOARDS]:
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
  [BoardsActions.Type.UPDATE_CARD_TYPE]:
        (state, action) => (state.map((board: IBoard) => (board.id === action.payload.id
          ? {
            ...board,
            cardType: action.payload.cardType,
          }
          : board))),
  [BoardsActions.Type.REMOVE_BOARD]:
        (state, action) => state.filter((board: IBoard) => board.id !== action.payload.id),
}, initialState);
