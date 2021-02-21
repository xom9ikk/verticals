import validator from '@helpers/validator';
import i18n from '@/i18n';

export const validatorRegisterForm = ({
  name: validator.text({ min: 2, name: i18n.t('First name') }),
  surname: validator.text({ min: 2, name: i18n.t('Last name') }),
  email: validator.email({ max: 64 }),
  username: validator.text({ min: 2, name: i18n.t('Username') }),
  password: validator.password({ min: 6, max: 36 }),
});
