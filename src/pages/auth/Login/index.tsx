/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import useWith from 'ramda/src/useWith';
import { Input } from '@comp/Input';
import { Button } from '@comp/Button';
import { Form } from '@comp/Form';
import { useForm } from '@use/form';
import { AuthActions } from '@store/actions';
import { validatorLoginForm } from '@helpers/validator/form/login';

interface IFormValidatedState {
  email: string;
  password: string;
}

const initialState = {
  email: '',
  password: '',
};

export const Login: FC = () => {
  const dispatch = useDispatch();

  const {
    handleChange, handleSubmit, handleBlur, values, errors, touches,
  } = useForm<IFormValidatedState>(
    initialState,
    useWith(dispatch, [AuthActions.signIn]),
    validatorLoginForm,
  );

  return (
    <Form
      title="Sign in"
      subtitle="Welcome back to Verticals."
      handleSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder="Email"
        touched={touches.email}
        error={errors.email}
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        type="password"
        placeholder="Password"
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
