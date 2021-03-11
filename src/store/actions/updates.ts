import { createAction } from '@reduxjs/toolkit';

export const UpdatesActions = {
  effect: {
    subscribe: createAction('UPDATE-EFFECT/SUBSCRIBE'),
  },
};
