import { BoardsActions } from '@store/actions';
import { EnumCardType, EnumColors } from '@type/entities';
import { DEFAULT_BOARD_ICON, TEMP_ID } from '@/constants';
import { BoardsReducer, initialState } from '@store/reducers/boards';

const mockBoards = [{
  id: 1,
  title: 'Title',
  icon: 'path/to/icon',
  cardType: EnumCardType.Checkboxes,
  description: 'Description for board',
  color: EnumColors.Green,
}, {
  id: 2,
  title: 'Title #2',
  icon: 'path/to/icon2',
  cardType: EnumCardType.Nothing,
  description: 'Description for board #2',
  color: EnumColors.Red,
}, {
  id: 3,
  title: 'Title #3',
  icon: 'path/to/icon3',
  cardType: EnumCardType.Dashes,
  description: 'Description for board #3',
  color: EnumColors.Gray,
}, {
  id: 3,
  title: 'Title #4',
  icon: 'path/to/icon4',
  cardType: EnumCardType.Arrows,
  description: 'Description for board #4',
  color: EnumColors.Turquoise,
}, {
  id: 4,
  title: 'Title #5',
  icon: 'path/to/icon5',
  cardType: EnumCardType.Checkboxes,
  description: 'Description for board #5',
  color: null,
}];

describe('Board reducer', () => {
  it('set all', () => {
    const [board, board2] = mockBoards;
    expect(BoardsReducer(initialState, BoardsActions.setAll({
      entities: [board, board2],
      positions: [board.id, board2.id],
    }))).toEqual({
      entities: [board, board2],
      positions: [board.id, board2.id],
    });
  });
  it('set positions', () => {
    expect(BoardsReducer(initialState, BoardsActions.setPositions([1, 2, 3, 4, 5, 6, 7]))).toEqual({
      entities: [],
      positions: [1, 2, 3, 4, 5, 6, 7],
    });
  });
  it('update entity', () => {
    const [board, board2] = mockBoards;
    const initialStateWithTwoBoards = {
      entities: [board, board2],
      positions: [board.id, board2.id],
    };
    expect(BoardsReducer(initialStateWithTwoBoards, BoardsActions.updateEntity({
      id: 1,
      title: 'new Title',
    }))).toEqual({
      entities: [{
        ...board,
        title: 'new Title',
      }, board2],
      positions: [board.id, board2.id],
    });
  });
  it('add board', () => {
    const [board] = mockBoards;
    expect(BoardsReducer(initialState, BoardsActions.add(board))).toEqual({
      entities: [board],
      positions: [board.id],
    });
  });
  it('move', () => {
    const [board, board2, board3, board4] = mockBoards;
    const initialStateWithFourBoards = {
      entities: [board, board2, board3, board4],
      positions: [board.id, board2.id, board3.id, board4.id],
    };
    expect(BoardsReducer(initialStateWithFourBoards, BoardsActions.move({
      sourcePosition: 0,
      destinationPosition: 2,
    }))).toEqual({
      entities: [board, board2, board3, board4],
      positions: [board2.id, board3.id, board.id, board4.id],
    });
  });
  it('insert in position', () => {
    const [board, board2, board3, board4, board5] = mockBoards;
    const initialStateWithFourBoards = {
      entities: [board, board2, board3, board4],
      positions: [board.id, board2.id, board3.id, board4.id],
    };
    expect(BoardsReducer(initialStateWithFourBoards, BoardsActions.insertInPosition({
      position: 2,
      entity: board5,
    }))).toEqual({
      entities: [board, board2, board3, board4, board5],
      positions: [board.id, board2.id, board5.id, board3.id, board4.id],
    });
  });
  it('remove', () => {
    const [board, board2, board3, board4] = mockBoards;
    const initialStateWithFourBoards = {
      entities: [board, board2, board3, board4],
      positions: [board.id, board2.id, board3.id, board4.id],
    };
    expect(BoardsReducer(initialStateWithFourBoards, BoardsActions.remove({
      id: board3.id,
    }))).toEqual({
      entities: [board, board2, board4],
      positions: [board.id, board2.id, board4.id],
    });
  });
  it('draw below', () => {
    const [board, board2, board3, board4] = mockBoards;
    const initialStateWithFourBoards = {
      entities: [board, board2, board3, board4],
      positions: [board.id, board2.id, board3.id, board4.id],
    };
    expect(BoardsReducer(initialStateWithFourBoards, BoardsActions.drawBelow({
      belowId: board2.id,
    }))).toEqual({
      entities: [board, board2, board3, board4, {
        id: TEMP_ID,
        belowId: board2.id,
        title: '',
        icon: DEFAULT_BOARD_ICON,
        cardType: EnumCardType.Checkboxes,
      }],
      positions: [board.id, board2.id, TEMP_ID, board3.id, board4.id],
    });
  });
  it('remove temporary board', () => {
    const [board, board2, board3, board4] = mockBoards;
    const initialStateWithFourBoards = {
      entities: [board, board2, board3, board4, {
        id: TEMP_ID,
        belowId: board2.id,
        title: '',
        icon: DEFAULT_BOARD_ICON,
        cardType: EnumCardType.Checkboxes,
      }],
      positions: [board.id, board2.id, TEMP_ID, board3.id, board4.id],
    };
    expect(BoardsReducer(initialStateWithFourBoards, BoardsActions.removeTemp())).toEqual({
      entities: [board, board2, board3, board4],
      positions: [board.id, board2.id, board3.id, board4.id],
    });
  });
});
