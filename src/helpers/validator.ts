// @ts-ignore
import is from 'is_js';

const email = (payload: string) => {
  const isValid = is.email(payload);
  let error = '';

  if (!isValid) {
    error = 'Invalid email address';
  }

  if (payload.length === 0) {
    error = 'Invalid email address';
  }

  return {
    error,
    isValid,
  };
};

const password = (payload: string, minLength: number = 5) => {
  let error = '';

  if (payload.length <= minLength) {
    error = 'Password is short';
  }

  if (payload.length === 0) {
    error = 'Can\'t be blank';
  }

  return {
    error,
    isValid: !error,
  };
};

const text = (payload: string, minLength: number = 5, fieldName: string) => {
  if (minLength === 0 && payload.length === 0) {
    return {
      isValid: true,
    };
  }

  let error = '';

  if (payload.length <= minLength) {
    error = `${fieldName} is short`;
  }

  if (payload.length === 0) {
    error = 'Can\'t be blank';
  }

  return {
    error,
    isValid: !error,
  };
};

export default {
  email,
  password,
  text,
};
