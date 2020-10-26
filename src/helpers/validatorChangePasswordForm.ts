import validator from './validator';

export const validatorChangePasswordForm = {
  oldPassword: validator.password({ min: 5, name: 'Old password' }),
  newPassword: validator.password({ min: 5, name: 'New password' }),
};
