// @ts-ignore
import is from 'is_js';
import i18n from '@/i18n';

export type IValidatorPayload = string | null;

export interface IValidatorRules {
  readonly min?: number;
  readonly max?: number;
  readonly name?: string;
}

export interface IValidatorResult {
  readonly isValid: boolean;
  readonly message?: string;
}

const email = (
  { max = 64 }: IValidatorRules,
) => (payload: IValidatorPayload): IValidatorResult => {
  const isValid = is.email(payload);
  let message = '';

  const length = payload?.length ?? 0;

  if (!isValid) {
    message = i18n.t('Invalid email address');
  }

  if (length > max) {
    message = i18n.t('Email is too long');
  }

  if (length === 0) {
    message = i18n.t('Can\'t be blank');
  }

  return {
    message,
    isValid,
  };
};

const password = (
  { min = 5, max = 36, name }: IValidatorRules,
) => (payload: IValidatorPayload): IValidatorResult => {
  let message = '';

  const length = payload?.length ?? 0;

  if (length < min) {
    message = i18n.t('Password is short');
  }

  if (length > max) {
    message = `${name || i18n.t('Entered value')} ${i18n.t('is too long')}`;
  }

  if (length === 0) {
    message = i18n.t('Can\'t be blank');
  }

  return {
    message,
    isValid: !message,
  };
};

const text = (
  { min = 5, max = 200, name }: IValidatorRules,
) => (payload: IValidatorPayload) : IValidatorResult => {
  const length = payload?.length ?? 0;

  if (min === 0 && length === 0) {
    return {
      isValid: true,
    };
  }

  let message = '';

  if (length < min) {
    message = `${name || i18n.t('Entered value')} ${i18n.t('is short')}`;
  }

  if (length > max) {
    message = `${name || i18n.t('Entered value')} ${i18n.t('is too long')}`;
  }

  if (length === 0) {
    message = i18n.t('Can\'t be blank');
  }

  return {
    message,
    isValid: !message,
  };
};

export default {
  email,
  password,
  text,
};
