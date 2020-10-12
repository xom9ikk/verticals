import { IRootState } from '@/store/reducers/state';

export const getComments = (state: IRootState) => state.comments;
