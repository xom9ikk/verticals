import validator from './validator';

interface IValidatorLoginForm {
  email: string,
  password: string,
}

export const validatorLoginForm = ({ email, password }: IValidatorLoginForm) => ({
  email: validator.email(email),
  password: validator.password(password, 5),
});
