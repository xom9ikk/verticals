import { TEMP_ID } from '@/constants';
import { ColumnsActions } from '@store/actions';
import { ColumnsReducer, initialState } from '@store/reducers/columns';
import { EnumColors } from '@type/entities';

const mockColumns = [{
  id: 1,
  boardId: 11,
  title: 'Column Title',
  description: 'Description for column',
  color: EnumColors.Green,
  isCollapsed: true,
  width: 378,
}, {
  id: 2,
  boardId: 11,
  title: 'Column Title #2',
  description: 'Description for column #2',
  color: EnumColors.Red,
  isCollapsed: true,
  width: 340,
}, {
  id: 3,
  boardId: 11,
  title: 'Column Title #3',
  description: 'Description for column #3',
  color: EnumColors.Gray,
  isCollapsed: true,
  width: 490,
}, {
  id: 3,
  boardId: 22,
  title: 'Column Title #4',
  description: 'Description for column #4',
  color: EnumColors.Turquoise,
  isCollapsed: true,
  width: 620,
}, {
  id: 4,
  boardId: 22,
  title: 'Column Title #5',
  description: 'Description for column #5',
  color: null,
  isCollapsed: true,
  width: 570,
}];

describe('Column reducer', () => {
  it('set all', () => {
    const [column, column2] = mockColumns;
    expect(ColumnsReducer(initialState, ColumnsActions.setAll({
      entities: [column, column2],
      positions: {
        [column.boardId]: [column.id, column2.id],
      },
    }))).toEqual({
      entities: [column, column2],
      positions: {
        [column.boardId]: [column.id, column2.id],
      },
    });
  });
  it('set positions', () => {
    expect(ColumnsReducer(initialState, ColumnsActions.setPositionsByBoardId({
      boardId: 1,
      positions: [1, 2, 3, 4, 5, 6, 7],
    }))).toEqual({
      entities: [],
      positions: {
        1: [1, 2, 3, 4, 5, 6, 7],
      },
    });
  });
  it('update entity', () => {
    const [column, column2] = mockColumns;
    const initialStateWithTwoColumns = {
      entities: [column, column2],
      positions: {
        [column.boardId]: [column.id, column2.id],
      },
    };
    expect(ColumnsReducer(initialStateWithTwoColumns, ColumnsActions.updateEntity({
      id: 1,
      title: 'new Column Title',
    }))).toEqual({
      entities: [{
        ...column,
        title: 'new Column Title',
      }, column2],
      positions: {
        [column.boardId]: [column.id, column2.id],
      },
    });
  });
  it('add column', () => {
    const [column] = mockColumns;
    expect(ColumnsReducer(initialState, ColumnsActions.add(column))).toEqual({
      entities: [column],
      positions: {
        [column.boardId]: [column.id],
      },
    });
  });
  it('move', () => {
    const [column, column2, column3, columnFromOtherBoard] = mockColumns;
    const initialStateWithFourColumns = {
      entities: [column, column2, column3, columnFromOtherBoard],
      positions: {
        [column.boardId]: [column.id, column2.id, column3.id],
        [columnFromOtherBoard.boardId]: [columnFromOtherBoard.id],
      },
    };
    expect(ColumnsReducer(initialStateWithFourColumns, ColumnsActions.move({
      boardId: column.boardId,
      sourcePosition: 2,
      destinationPosition: 0,
    }))).toEqual({
      entities: [column, column2, column3, columnFromOtherBoard],
      positions: {
        [column.boardId]: [column3.id, column.id, column2.id],
        [columnFromOtherBoard.boardId]: [columnFromOtherBoard.id],
      },
    });
  });
  it('insert in position', () => {
    const [column, column2, column3, columnFromOtherBoard, columnFromOtherBoard2] = mockColumns;
    const initialStateWithFourColumns = {
      entities: [column, column2, column3, columnFromOtherBoard],
      positions: {
        [column.boardId]: [column.id, column2.id, column3.id],
        [columnFromOtherBoard.boardId]: [columnFromOtherBoard.id],
      },
    };
    expect(ColumnsReducer(initialStateWithFourColumns, ColumnsActions.insertInPosition({
      position: 0,
      entity: columnFromOtherBoard2,
    }))).toEqual({
      entities: [column, column2, column3, columnFromOtherBoard, columnFromOtherBoard2],
      positions: {
        [column.boardId]: [column.id, column2.id, column3.id],
        [columnFromOtherBoard.boardId]: [columnFromOtherBoard2.id, columnFromOtherBoard.id],
      },
    });
  });
  it('remove', () => {
    const [column, column2, column3, columnFromOtherBoard] = mockColumns;
    const initialStateWithFourColumns = {
      entities: [column, column2, column3, columnFromOtherBoard],
      positions: {
        [column.boardId]: [column.id, column2.id, column3.id],
        [columnFromOtherBoard.boardId]: [columnFromOtherBoard.id],
      },
    };
    expect(ColumnsReducer(initialStateWithFourColumns, ColumnsActions.remove({
      id: column3.id,
    }))).toEqual({
      entities: [column, column2, columnFromOtherBoard],
      positions: {
        [column.boardId]: [column.id, column2.id],
        [columnFromOtherBoard.boardId]: [columnFromOtherBoard.id],
      },
    });
  });
  it('draw below', () => {
    const [column, column2, column3, columnFromOtherBoard] = mockColumns;
    const initialStateWithFourColumns = {
      entities: [column, column2, column3, columnFromOtherBoard],
      positions: {
        [column.boardId]: [column.id, column2.id, column3.id],
        [columnFromOtherBoard.boardId]: [columnFromOtherBoard.id],
      },
    };
    expect(ColumnsReducer(initialStateWithFourColumns, ColumnsActions.drawBelow({
      boardId: column2.boardId,
      belowId: column2.id,
    }))).toEqual({
      entities: [column, column2, column3, columnFromOtherBoard, {
        id: TEMP_ID,
        boardId: column2.boardId,
        belowId: column2.id,
        title: '',
      }],
      positions: {
        [column.boardId]: [column.id, column2.id, TEMP_ID, column3.id],
        [columnFromOtherBoard.boardId]: [columnFromOtherBoard.id],
      },
    });
  });
  it('remove temporary column', () => {
    const [column, column2, column3, columnFromOtherBoard] = mockColumns;
    const initialStateWithFourColumns = {
      entities: [column, column2, column3, columnFromOtherBoard, {
        id: TEMP_ID,
        boardId: column2.boardId,
        belowId: column2.id,
        title: '',
      }],
      positions: {
        [column.boardId]: [column.id, column2.id, TEMP_ID, column3.id],
        [columnFromOtherBoard.boardId]: [columnFromOtherBoard.id],
      },
    };
    expect(ColumnsReducer(initialStateWithFourColumns, ColumnsActions.removeTemp())).toEqual({
      entities: [column, column2, column3, columnFromOtherBoard],
      positions: {
        [column.boardId]: [column.id, column2.id, column3.id],
        [columnFromOtherBoard.boardId]: [columnFromOtherBoard.id],
      },
    });
  });
  it('reverse order', () => {
    const [column, column2, column3, columnFromOtherBoard] = mockColumns;
    const initialStateWithFourColumns = {
      entities: [column, column2, column3, columnFromOtherBoard],
      positions: {
        [column.boardId]: [column.id, column2.id, column3.id],
        [columnFromOtherBoard.boardId]: [columnFromOtherBoard.id],
      },
    };
    expect(ColumnsReducer(initialStateWithFourColumns, ColumnsActions.reverseOrder({
      boardId: column.boardId,
    }))).toEqual({
      entities: [column, column2, column3, columnFromOtherBoard],
      positions: {
        [column.boardId]: [column3.id, column2.id, column.id],
        [columnFromOtherBoard.boardId]: [columnFromOtherBoard.id],
      },
    });
  });
});
