import validator from './validator';

interface IValidatorRegisterForm {
  firstName: string,
  lastName: string,
  email: string,
  password: string,
}

export const validatorRegisterForm = ({
  firstName, lastName, email, password,
}: IValidatorRegisterForm) => ({
  firstName: validator.text(firstName, 5, 'First name'),
  lastName: validator.text(lastName, 5, 'Last name'),
  email: validator.email(email),
  password: validator.password(password, 5),
});
