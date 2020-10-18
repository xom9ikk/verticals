import validator from './validator';

export const validatorRegisterForm = ({
  name: validator.text({ min: 2, name: 'First name' }),
  surname: validator.text({ min: 2, name: 'Last name' }),
  email: validator.email(),
  username: validator.text({ min: 2, name: 'Username' }),
  password: validator.password({ min: 6 }),
});
