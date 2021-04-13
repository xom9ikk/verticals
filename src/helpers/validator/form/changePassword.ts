import i18n from '@/i18n';
import validator from '@helpers/validator';

export const validatorChangePasswordForm = {
  oldPassword: validator.password({ min: 6, name: i18n.t('Old password') }),
  newPassword: validator.password({ min: 6, name: i18n.t('New password') }),
};
