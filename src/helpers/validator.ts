// @ts-ignore
import is from 'is_js';

export type IValidatorPayload = string | null;

export interface IValidatorRules {
  min?: number;
  max?: number;
  name?: string;
}

export interface IValidatorResult {
  isValid: boolean;
  message?: string;
}

const email = (
  { max = 64 }: IValidatorRules,
) => (payload: IValidatorPayload): IValidatorResult => {
  const isValid = is.email(payload);
  let message = '';

  const length = payload?.length ?? 0;

  if (!isValid) {
    message = 'Invalid email address';
  }

  if (length > max) {
    message = 'Email is too long';
  }

  if (length === 0) {
    message = 'Can\'t be blank';
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
    message = 'Password is short';
  }

  if (length > max) {
    message = `${name || 'Entered value'} is too long`;
  }

  if (length === 0) {
    message = 'Can\'t be blank';
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
    message = `${name || 'Entered value'} is short`;
  }

  if (length > max) {
    message = `${name || 'Entered value'} is too long`;
  }

  if (length === 0) {
    message = 'Can\'t be blank';
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
