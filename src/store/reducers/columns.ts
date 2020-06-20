import { handleActions } from 'redux-actions';
import { ColumnsActions } from '../actions';
import { IColumn, IColumns } from '../../types';

const initialState: IColumns = [
  {
    id: 'column-1',
    boardId: 'board-1',
    title: 'The basics',
    description: 'Technologies, frameworks etc. for studying',
  },
  {
    id: 'column-2',
    boardId: 'board-1',
    title: 'Modules',
    description: 'Modules from npm',
  },
  {
    id: 'column-3',
    boardId: 'board-1',
    title: 'Frontend',
    description: 'Frontend things',
  },
  {
    id: 'column-4',
    boardId: 'board-1',
    title: 'Backend',
    description: 'Technologies, frameworks etc. for studying',
  },
  {
    id: 'column-5',
    boardId: 'board-1',
    title: 'Databases',
    description: 'All databases',
  },
  {
    id: 'column-6',
    boardId: 'board-1',
    title: 'DevOps',
    description: 'Things for DevOps',
  },
  {
    id: 'column-7',
    boardId: 'board-1',
    title: 'Instruments',
    description: 'Just cool instruments for dev',
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
        ...action.payload,
      }]),
}, initialState);
