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
  name: validator.text({ min: 2, name: 'First name' })(name),
  surname: validator.text({ min: 2, name: 'Last name' })(surname),
  email: validator.email()(email),
  username: validator.text({ min: 2, name: 'Username' })(username),
  password: validator.password({ min: 6 })(password),
});
