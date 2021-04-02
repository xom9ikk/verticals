/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import useWith from 'ramda/src/useWith';
import { Input } from '@comp/Input';
import { Button } from '@comp/Button';
import { Form } from '@comp/Form';
import { useForm } from '@use/form';
import { Divider } from '@comp/Divider';
import { AuthActions } from '@store/actions';
import { validatorRegisterForm } from '@helpers/validator/form/register';
import { useTranslation } from 'react-i18next';
import { BadgeSoon } from '@comp/BadgeSoon';

interface IFormValidatedState {
  name: string;
  surname: string;
  email: string;
  username: string;
  password: string;
}

const initialState = {
  name: '',
  surname: '',
  email: '',
  username: '',
  password: '',
};

export const Register: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const {
    handleChange, handleSubmit, handleBlur, values, errors, touches,
  } = useForm<IFormValidatedState>(
    initialState,
    useWith(dispatch, [AuthActions.effect.signUp]),
    validatorRegisterForm,
  );

  return (
    <Form
      title={t('Hi there!')}
      subtitle={t('Please create your account.')}
      handleSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder={t('First name')}
        touched={touches.name}
        error={errors.name}
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        type="text"
        placeholder={t('Last name')}
        touched={touches.surname}
        error={errors.surname}
        name="surname"
        value={values.surname}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        type="text"
        placeholder={t('Enter your email...')}
        touched={touches.email}
        error={errors.email}
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        type="text"
        placeholder={t('Username')}
        touched={touches.username}
        error={errors.username}
        name="username"
        value={values.username}
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
        Sign Up
      </Button>
      <Divider />
      <Button isMaxWidth type="button">
        <img src="/assets/svg/google.svg" alt="google" />
        &nbsp;
        {t('Sign in with Google')}
        <BadgeSoon text="Soon" />
      </Button>
    </Form>
  );
};
