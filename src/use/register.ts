// import { useAlert } from './alert';

export const useRegister = () => {
  // const { show, TYPES } = useAlert();

  const register = async ({ email, password }: any) => {
    console.log(email, password);
    try {
      // await AuthService.signInUser(email, password);
    } catch (e) {
      // show('Ooops!', e.message, TYPES.DANGER);
    }
  };

  return {
    register,
  };
};
