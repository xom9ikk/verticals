import validator from './validator';

export const validatorResetForm = ({
  email: validator.email({ max: 64 }),
});
