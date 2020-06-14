import { CustomActions } from '../actions';

const fetchCustom = () => async (dispatch: Function) => {
  try {
    // await
    dispatch(CustomActions.setCustom({field: 'customValue'}));
  } catch (error) {
    console.error('fetchCustom', error);
  }
};

export const CustomEffects = {
  fetchCustom,
};
