// import { useAlert } from './alert';

export const useReset = () => {
  // const { show, TYPES } = useAlert();

  const reset = async ({ email, password }: any) => {
    console.log(email, password);
    try {
      // await AuthService.signInUser(email, password);
    } catch (e) {
      // show('Ooops!', e.message, TYPES.DANGER);
    }
  };

  return {
    reset,
  };
};
