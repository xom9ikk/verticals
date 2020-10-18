import validator from './validator';

export const validatorLoginForm = ({
  email: validator.email(),
  password: validator.password({ min: 5 }),
});
