import validator from './validator';

export const validatorLoginForm = ({
  email: validator.email({ max: 64 }),
  password: validator.password({ min: 5, max: 36 }),
});
