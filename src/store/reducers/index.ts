import { combineReducers } from 'redux';
import { IRootState } from './state';
import { CustomReducer } from './custom';

export const rootReducer = combineReducers<IRootState>({
  custom: CustomReducer as any,
});
