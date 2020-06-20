import { handleActions } from 'redux-actions';
import { BoardsActions } from '../actions';
import { IBoards } from '../../types';

const initialState: IBoards = [{
  id: 'board-1',
  icon: '/svg/board/star.svg',
  title: 'Today',
}, {
  id: 'board-2',
  icon: '/svg/board/item.svg',
  title: 'To reading',
}, {
  id: 'board-3',
  icon: '/svg/board/item.svg',
  title: 'Technologies etc.',
}, {
  id: 'board-4',
  icon: '/svg/board/item.svg',
  title: 'Projects',
}, {
  id: 'board-5',
  icon: '/svg/board/item.svg',
  title: 'Branches',
}, {
  id: 'board-6',
  icon: '/svg/board/item.svg',
  title: 'Films',
}, {
  id: 'board-7',
  icon: '/svg/board/item.svg',
  title: 'Buy',
}, {
  id: 'board-8',
  icon: '/svg/board/item.svg',
  title: 'Books',
}, {
  id: 'board-9',
  icon: '/svg/board/trash.svg',
  title: 'Trash',
}];

export const BoardsReducer = handleActions<IBoards, IBoards>({
  [BoardsActions.Type.SET_BOARDS]:
        (state, action) => ([...action.payload]),
}, initialState);
