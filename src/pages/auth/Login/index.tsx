/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { Input } from '@comp/Input';
import { Button } from '@comp/Button';
import { Form } from '@comp/Form';
import { useForm } from '@/use/form';
import { validatorLoginForm } from '@/helpers/validatorLoginForm';
import { AuthActions } from '@/store/actions';

const initialState = {
  email: {
    defaultValue: '',
    error: 'Invalid email address',
    isValid: false,
  },
  password: {
    defaultValue: '',
    error: 'Can\'t be blank',
    isValid: false,
  },
};

export const Login: FC = () => {
  const dispatch = useDispatch();

  const handlerSubmit = async () => {
    dispatch(AuthActions.signIn({
      email: values.email,
      password: values.password,
    }));
  };

  const {
    handleChange, handleSubmit, handleBlur, values, errors, touched,
  } = useForm(initialState, handlerSubmit, validatorLoginForm);

  return (
    <Form
      title="Sign in"
      subtitle="Welcome back to Verticals."
      handleSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder="Email"
        touched={touched.email}
        error={errors.email.error}
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        type="password"
        placeholder="Password"
        touched={touched.password}
        error={errors.password.error}
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
        Sign In
      </Button>
      <Button
        type="submit"
        isMaxWidth
      >
        <img src="/assets/svg/google.svg" alt="google" />
        &nbsp;
        Sign in with Google
      </Button>
      <Link
        to="/auth/reset"
        className="link"
      >
        Forgot your password?
      </Link>
      <div>
        <span className="text">New to Verticals?&nbsp;</span>
        <Link
          to="/auth/register"
          className="link"
        >
          Create an account.
        </Link>
      </div>
    </Form>
  );
};
