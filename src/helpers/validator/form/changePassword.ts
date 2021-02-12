import validator from '@helpers/validator';

export const validatorChangePasswordForm = {
  oldPassword: validator.password({ min: 6, name: 'Old password' }),
  newPassword: validator.password({ min: 6, name: 'New password' }),
};
