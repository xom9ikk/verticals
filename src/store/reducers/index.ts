import { combineReducers } from 'redux';
import { IRootState } from './state';
import { SystemReducer } from './system';

export const rootReducer = combineReducers<IRootState>({
  system: SystemReducer as any,
});
