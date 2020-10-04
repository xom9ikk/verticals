import validator from './validator';

interface IValidatorAccountForm {
  email: string,
}

export const validatorAccountForm = ({ email }: IValidatorAccountForm) => ({
  email: validator.email(email),
});
