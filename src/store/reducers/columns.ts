/* eslint-disable max-len */
import {
  IColumn, IColumns,
} from '@type/entities';
import { createReducer } from '@reduxjs/toolkit';
import { ColumnsActions } from '@store/actions';

const initialState: IColumns = [
  // {
  //   id: 'column-1',
  //   boardId: 'board-2',
  //   title: 'The basics',
  //   description: 'Technologies, frameworks etc. for studying',
  //   position: 0,
  // },
  // {
  //   id: 'column-2',
  //   boardId: 'board-2',
  //   title: 'Modules',
  //   description: 'Modules from npm',
  //   position: 1,
  // },
  // {
  //   id: 'column-3',
  //   boardId: 'board-2',
  //   title: 'Frontend',
  //   description: 'Frontend things',
  //   position: 2,
  // },
  // {
  //   id: 'column-4',
  //   boardId: 'board-2',
  //   title: 'Backend',
  //   description: 'Technologies, frameworks etc. for studying',
  //   position: 3,
  // },
  // {
  //   id: 'column-5',
  //   boardId: 'board-2',
  //   title: 'Databases',
  //   description: 'All databases',
  //   position: 4,
  // },
  // {
  //   id: 'column-6',
  //   boardId: 'board-2',
  //   title: 'DevOps',
  //   description: 'Things for DevOps',
  //   position: 5,
  // },
  // {
  //   id: 'column-7',
  //   boardId: 'board-2',
  //   title: 'Instruments',
  //   description: 'Just cool instruments for dev',
  //   position: 6,
  // },
];

export const ColumnsReducer = createReducer(initialState, (builder) => builder
  .addCase(ColumnsActions.setAll, (state, action) => action.payload)
  .addCase(ColumnsActions.updateTitle, (state, action) => (state.map((column: IColumn) => (column.id === action.payload.id
    ? {
      ...column,
      title: action.payload.title,
    }
    : column))))
  .addCase(ColumnsActions.updateDescription, (state, action) => (state.map((column: IColumn) => (column.id === action.payload.id
    ? {
      ...column,
      description: action.payload.description,
    }
    : column))))
  .addCase(ColumnsActions.add, (state, action) => ([...state, {
    ...action.payload,
  }]))
  .addCase(ColumnsActions.updatePosition, (state, action) => {
    const {
      boardId, sourcePosition, destinationPosition,
    } = action.payload;
    const targetBoard = state
      .filter((column: IColumn) => column.boardId === boardId)
      .sort((a, b) => a.position - b.position);
    const otherBoards = state
      .filter((column: IColumn) => column.boardId !== boardId);
    const targetColumnIndex = targetBoard
      .findIndex((column: IColumn) => column.position === sourcePosition);
    const targetColumn = targetBoard[targetColumnIndex];
    targetBoard.splice(targetColumnIndex, 1);

    targetBoard.splice(destinationPosition, 0, {
      ...targetColumn,
      position: destinationPosition,
    });

    const newTargetBoard = targetBoard.map((column, index) => ({
      ...column,
      position: index,
    }));

    return [
      ...otherBoards,
      ...newTargetBoard,
    ];
  })
  .addCase(ColumnsActions.insertInPosition, (state, action) => {
    const { position, boardId } = action.payload;
    const targetBoard = state
      .filter((column: IColumn) => column.boardId === boardId)
      .sort((a, b) => a.position - b.position);
    const otherBoards = state
      .filter((column: IColumn) => column.boardId !== boardId);
    const spliceIndex = targetBoard
      .findIndex((column: IColumn) => column.position === position);
    const normalizedSpliceIndex = spliceIndex === -1 ? targetBoard.length : spliceIndex;
    const { belowId, ...newColumn } = action.payload;
    targetBoard.splice(normalizedSpliceIndex, 0, newColumn);
    const newTargetColumn = targetBoard.map((column: IColumn, index) => ({
      ...column,
      position: index,
    }));
    return [
      ...otherBoards,
      ...newTargetColumn,
    ];
  })
  .addCase(ColumnsActions.updateColor, (state, action) => (state.map((column: IColumn) => (column.id === action.payload.id
    ? {
      ...column,
      color: action.payload.color,
    }
    : column))))
  .addCase(ColumnsActions.updateIsCollapsed, (state, action) => (state.map((column: IColumn) => (column.id === action.payload.id
    ? {
      ...column,
      isCollapsed: action.payload.isCollapsed,
    }
    : column))))
  .addCase(ColumnsActions.remove, (state, action) => {
    let boardId: number | null = null;
    const columnsAfterDelete = state.filter((column: IColumn) => {
      if (column.id !== action.payload.id) {
        return true;
      }
      boardId = column.boardId;
      return false;
    });
    if (boardId) {
      const columnsInBoard = columnsAfterDelete
        .filter((column: IColumn) => column.boardId === boardId)
        .sort((a, b) => a.position - b.position)
        .map((column: IColumn, index) => ({
          ...column,
          position: index,
        }));
      const otherColumns = [...columnsAfterDelete]
        .filter((column: IColumn) => column.boardId !== boardId);
      return [
        ...columnsInBoard,
        ...otherColumns,
      ];
    }
    return state;
  })
  .addCase(ColumnsActions.drawBelow, (state, action) => {
    const { belowId, boardId } = action.payload;
    const columnsInBoard = [...state]
      .sort((a, b) => a.position - b.position)
      .filter((column: IColumn) => column.boardId === boardId);
    const otherColumn = [...state]
      .filter((column: IColumn) => column.boardId !== boardId);
    const spliceIndex = columnsInBoard.findIndex((column: IColumn) => column.id === belowId);
    columnsInBoard.splice(spliceIndex + 1, 0, {
      id: 0,
      boardId,
      belowId,
      position: spliceIndex,
      title: '',
    });
    const sortedColumns = columnsInBoard
      .map((column: IColumn, index) => ({
        ...column,
        position: index,
      }));
    return [
      ...sortedColumns,
      ...otherColumn,
    ];
  })
  .addCase(ColumnsActions.removeTemp, (state) => {
    const boardIds = new Set();
    state.forEach((column: IColumn) => boardIds.add(column.boardId));
    let columns: IColumns = [];
    boardIds.forEach((boardId) => {
      const columnsInBoard = state
        .filter((column: IColumn) => column.boardId === boardId)
        .filter((column: IColumn) => column.belowId === undefined)
        .sort((a: IColumn, b: IColumn) => a.position - b.position)
        .map((column: IColumn, index) => ({
          ...column,
          position: index,
        }));
      columns = [...columns, ...columnsInBoard];
    });
    return columns;
  })
  .addCase(ColumnsActions.reverseOrder, (state, action) => {
    const {
      boardId,
    } = action.payload;
    const targetBoard = state
      .filter((column: IColumn) => column.boardId === boardId)
      .sort((a, b) => a.position - b.position);
    const otherBoards = state
      .filter((column: IColumn) => column.boardId !== boardId);

    const newTargetBoard = targetBoard
      .sort((a, b) => b.position - a.position)
      .map((column, index) => ({
        ...column,
        position: index,
      }));

    return [
      ...otherBoards,
      ...newTargetBoard,
    ];
  }));
