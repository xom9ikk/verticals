import i18n from '@/i18n';
import validator from '@helpers/validator';

export const validatorProfileForm = {
  name: validator.text({ min: 2, name: i18n.t('First name') }),
  surname: validator.text({ min: 2, name: i18n.t('Last name') }),
  username: validator.text({ min: 2, name: i18n.t('Username') }),
  bio: validator.text({ min: 0, max: 255, name: i18n.t('Bio') }),
};
