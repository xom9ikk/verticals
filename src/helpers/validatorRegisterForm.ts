import validator from './validator';

export const validatorRegisterForm = ({
  name: validator.text({ min: 2, name: 'First name' }),
  surname: validator.text({ min: 2, name: 'Last name' }),
  email: validator.email({ max: 64 }),
  username: validator.text({ min: 2, name: 'Username' }),
  password: validator.password({ min: 5, max: 36 }),
});
