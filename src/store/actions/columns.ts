import { createAction } from 'redux-actions';
import { IColumns } from '../../types';

enum Type {
  SET_COLUMNS = 'COLUMNS/SET_COLUMNS',
}

const setColumns = createAction(
  Type.SET_COLUMNS,
  (payload: IColumns) => (payload),
);

export const ColumnsActions = {
  Type,
  setColumns,
};
