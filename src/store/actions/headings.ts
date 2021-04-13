import { createAction } from '@reduxjs/toolkit';

import {
  IAddHeading,
  ICreateHeading,
  IDuplicateHeading,
  IFetchHeadingsByBoardId,
  IInsertHeading,
  IMoveHeading,
  IRemoveHeading,
  ISetHeadingPositionsByColumnId,
  ISetHeadings,
  IUpdateHeading,
} from '@type/actions';

export const HeadingsActions = {
  effect: {
    fetchByBoardId: createAction<IFetchHeadingsByBoardId>('HEADINGS-EFFECT/FETCH_BY_BOARD_ID'),
    create: createAction<ICreateHeading>('HEADINGS-EFFECT/CREATE'),
    update: createAction<IUpdateHeading>('HEADINGS-EFFECT/UPDATE'),
    remove: createAction<IRemoveHeading>('HEADINGS-EFFECT/REMOVE'),
    move: createAction<IMoveHeading>('HEADINGS-EFFECT/MOVE'),
    duplicate: createAction<IDuplicateHeading>('HEADINGS-EFFECT/DUPLICATE'),
  },
  setAll: createAction<ISetHeadings>('HEADINGS/SET_ALL'),
  add: createAction<IAddHeading>('HEADINGS/ADD'),
  insertInPosition: createAction<IInsertHeading>('HEADINGS/INSERT_IN_POSITION'),
  updateEntity: createAction<IUpdateHeading>('HEADINGS/UPDATE_ENTITY'),
  move: createAction<IMoveHeading>('HEADINGS/MOVE'),
  setPositionsByColumnId: createAction<ISetHeadingPositionsByColumnId>('HEADINGS/SET_POSITIONS_BY_COLUMN_ID'),
  remove: createAction<IRemoveHeading>('HEADINGS/REMOVE'),
};
