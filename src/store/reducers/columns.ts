/* eslint-disable no-plusplus */
import { handleActions } from 'redux-actions';
import { ColumnsActions } from '../actions';
import { IColumn, IColumns } from '../../types';

const initialState: IColumns = [
  {
    id: 'column-1',
    boardId: 'board-2',
    title: 'The basics',
    description: 'Technologies, frameworks etc. for studying',
    position: 0,
  },
  {
    id: 'column-2',
    boardId: 'board-2',
    title: 'Modules',
    description: 'Modules from npm',
    position: 1,
  },
  {
    id: 'column-3',
    boardId: 'board-2',
    title: 'Frontend',
    description: 'Frontend things',
    position: 2,
  },
  {
    id: 'column-4',
    boardId: 'board-2',
    title: 'Backend',
    description: 'Technologies, frameworks etc. for studying',
    position: 3,
  },
  {
    id: 'column-5',
    boardId: 'board-2',
    title: 'Databases',
    description: 'All databases',
    position: 4,
  },
  {
    id: 'column-6',
    boardId: 'board-2',
    title: 'DevOps',
    description: 'Things for DevOps',
    position: 5,
  },
  {
    id: 'column-7',
    boardId: 'board-2',
    title: 'Instruments',
    description: 'Just cool instruments for dev',
    position: 6,
  },
];

export const ColumnsReducer = handleActions<IColumns, any>({
  [ColumnsActions.Type.SET_COLUMNS]:
        (state, action) => ([...action.payload]),
  [ColumnsActions.Type.UPDATE_TITLE]:
      (state, action) => (state.map((column: IColumn) => (column.id === action.payload.id
        ? {
          ...column,
          title: action.payload.title,
        }
        : column))),
  [ColumnsActions.Type.UPDATE_DESCRIPTION]:
      (state, action) => (state.map((column: IColumn) => (column.id === action.payload.id
        ? {
          ...column,
          description: action.payload.description,
        }
        : column))),
  [ColumnsActions.Type.ADD]:
      (state, action) => ([...state, {
        id: Math.random().toString(),
        position: state.length,
        ...action.payload,
      }]),
  [ColumnsActions.Type.UPDATE_POSITION]:
      (state, action) => {
        const { sourcePosition, destinationPosition, boardId } = action.payload;
        const columns = [...state];
        const sourceColumn = state
          .filter((column) => column.boardId === boardId
            && column.position === sourcePosition)[0];
        columns.splice(sourcePosition, 1);
        columns.splice(destinationPosition, 0, {
          ...sourceColumn, position: destinationPosition,
        });
        return columns.map((column, index) => ({
          ...column,
          position: index,
        }));
      },
  [ColumnsActions.Type.UPDATE_COLOR]:
        (state, action) => (state.map((column: IColumn) => (column.id === action.payload.id
          ? {
            ...column,
            color: action.payload.color,
          }
          : column))),
  [ColumnsActions.Type.RESET_COLOR]:
        (state, action) => (state.map((column: IColumn) => (column.id === action.payload.id
          ? {
            ...column,
            color: undefined,
          }
          : column))),
  [ColumnsActions.Type.UPDATE_IS_MINIMIZE]:
        (state, action) => (state.map((column: IColumn) => (column.id === action.payload.id
          ? {
            ...column,
            isMinimize: action.payload.isMinimize,
          }
          : column))),
}, initialState);
