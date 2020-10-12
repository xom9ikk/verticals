import { IRootState } from '@/store/reducers/state';

export const getUsername = (state: IRootState) => state.user.username;
