import validator from '@helpers/validator';

export const validatorLoginForm = ({
  email: validator.email({ max: 64 }),
  password: validator.password({ min: 6, max: 36 }),
});
