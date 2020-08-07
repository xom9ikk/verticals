// import { useAlert } from './alert';

export const useLogin = () => {
  // const { show, TYPES } = useAlert();

  const login = async ({ email, password }: any) => {
    console.log(email, password);
    try {
      // await AuthService.signInUser(email, password);
    } catch (e) {
      // show('Ooops!', e.message, TYPES.DANGER);
    }
  };

  return {
    login,
  };
};
