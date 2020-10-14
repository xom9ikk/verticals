import validator from './validator';

interface IValidatorResetForm {
  email: string,
}

export const validatorResetForm = ({ email }: IValidatorResetForm) => ({
  email: validator.email()(email),
});
