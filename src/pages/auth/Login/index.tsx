/* eslint-disable @typescript-eslint/no-use-before-define */
import useWith from 'ramda/src/useWith';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

import { BadgeSoon } from '@comp/BadgeSoon';
import { Button } from '@comp/Button';
import { Form } from '@comp/Form';
import { Input } from '@comp/Input';
import { validatorLoginForm } from '@helpers/validator/form/login';
import { AuthActions } from '@store/actions';
import { useForm } from '@use/form';

interface IFormValidatedState {
  email: string;
  password: string;
}

const initialState = {
  email: '',
  password: '',
};

export const Login: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    handleChange, handleSubmit, handleBlur, values, errors, touches,
  } = useForm<IFormValidatedState>(
    initialState,
    useWith(dispatch, [AuthActions.effect.signIn]),
    validatorLoginForm,
  );

  return (
    <Form
      title={t('Sign in')}
      subtitle={t('Welcome back to Verticals.')}
      handleSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder={t('Email')}
        touched={touches.email}
        error={errors.email}
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        type="password"
        placeholder={t('Password')}
        touched={touches.password}
        error={errors.password}
        name="password"
        value={values.password}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Button
        type="submit"
        modificator="primary"
        isMaxWidth
      >
        {t('Sign In')}
      </Button>
      <Button
        type="button"
        isMaxWidth
      >
        <img src="/assets/svg/google.svg" alt="google" />
        &nbsp;
        <BadgeSoon text="Soon" />
      </Button>
      <Link
        to="/auth/reset"
        className="link"
      >
        {t('Forgot your password?')}
      </Link>
      <div>
        <span className="text">
          {t('New to Verticals?')}
          &nbsp;
        </span>
        <Link
          to="/auth/register"
          className="link"
        >
          {t('Create an account.')}
        </Link>
      </div>
    </Form>
  );
};
