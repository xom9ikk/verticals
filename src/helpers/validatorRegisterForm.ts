import validator from './validator';

interface IValidatorRegisterForm {
  name: string,
  surname: string,
  email: string,
  username: string,
  password: string,
}

export const validatorRegisterForm = ({
  name, surname, email, username, password,
}: IValidatorRegisterForm) => ({
  name: validator.text(name, 2, 'First name'),
  surname: validator.text(surname, 2, 'Last name'),
  email: validator.email(email),
  username: validator.text(username, 2, 'Username'),
  password: validator.password(password, 6),
});
