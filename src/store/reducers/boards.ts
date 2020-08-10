import { handleActions } from 'redux-actions';
import { icons } from '@/icons';
import { BoardsActions } from '../actions';
import { EnumTodoType, IBoard, IBoards } from '../../types';

const initialState: IBoards = [{
  id: 'today',
  icon: icons.board.star,
  title: 'Today',
  position: 0,
  cardType: EnumTodoType.Checkboxes,
},
{
  id: 'trash',
  icon: icons.board.trash,
  title: 'Trash',
  position: 1,
  cardType: EnumTodoType.Checkboxes,
},
{
  id: 'board-1',
  icon: icons.board.item,
  title: 'To reading',
  position: 2,
  cardType: EnumTodoType.Checkboxes,
}, {
  id: 'board-2',
  icon: icons.board.item,
  title: 'Technologies etc.',
  position: 3,
  cardType: EnumTodoType.Checkboxes,
}, {
  id: 'board-3',
  icon: icons.board.item,
  title: 'Projects',
  position: 4,
  cardType: EnumTodoType.Checkboxes,
}, {
  id: 'board-4',
  icon: icons.board.item,
  title: 'Branches',
  position: 5,
  cardType: EnumTodoType.Checkboxes,
}, {
  id: 'board-5',
  icon: icons.board.item,
  title: 'Films',
  position: 6,
  cardType: EnumTodoType.Checkboxes,
}, {
  id: 'board-6',
  icon: icons.board.item,
  title: 'Buy',
  position: 7,
  cardType: EnumTodoType.Checkboxes,
}, {
  id: 'board-7',
  icon: icons.board.item,
  title: 'Books',
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
  [BoardsActions.Type.ADD_BOARD_BELOW]:
        (state, action) => {
          const { id } = action.payload;
          const boards = [...state].sort((a, b) => a.position - b.position);
          const spliceIndex = boards.findIndex((board: IBoard) => board.id === id);
          boards.splice(spliceIndex + 1, 0, {
            id: 'new-board',
            position: spliceIndex,
            title: '',
            icon: icons.board.item,
            cardType: EnumTodoType.Checkboxes,
          });
          return boards.map((board: IBoard, index) => ({
            ...board,
            position: index,
          }));
        },
  [BoardsActions.Type.GENERATE_NEW_ID]:
        (state, action) => (state.map((board: IBoard) => (board.id === action.payload.id
          ? {
            ...board,
            id: Math.random().toString(),
          }
          : board))),
  [BoardsActions.Type.REMOVE_NEW_BOARDS]:
        (state) => (state.filter((board: IBoard) => board.id !== 'new-board')),
}, initialState);
