import validator from '@helpers/validator';

export const validatorResetForm = ({
  email: validator.email({ max: 64 }),
});
