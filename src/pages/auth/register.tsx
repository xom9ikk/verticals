/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from '@comp/Input';
import { Button } from '@comp/Button';
import { Form } from '@comp/Form';
import { useForm } from '@/use/form';
import { validatorRegisterForm } from '@/helpers/validatorRegisterForm';
import { Divider } from '@comp/Divider';
import { AuthActions } from '@/store/actions';

const initialState = {
  name: {
    defaultValue: '',
    error: 'Can\'t be blank',
    isValid: false,
  },
  surname: {
    defaultValue: '',
    error: 'Can\'t be blank',
    isValid: false,
  },
  email: {
    defaultValue: '',
    error: 'Invalid email address',
    isValid: false,
  },
  username: {
    defaultValue: '',
    error: 'Can\'t be blank',
    isValid: false,
  },
  password: {
    defaultValue: '',
    error: 'Can’t be blank',
    isValid: false,
  },
};

export const Register: FC = () => {
  const dispatch = useDispatch();

  const handlerSubmit = async () => {
    dispatch(AuthActions.signUp({
      name: values.name,
      surname: values.surname,
      email: values.email,
      username: values.username,
      password: values.password,
    }));
  };

  const {
    handleChange, handleSubmit, handleBlur, values, errors, touched,
  } = useForm(initialState, handlerSubmit, validatorRegisterForm);

  return (
    <Form
      title="Hi there!"
      subtitle="Please create your account."
      handleSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder="First name"
        touched={touched.name}
        error={errors.name.error}
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        type="text"
        placeholder="Last name"
        touched={touched.surname}
        error={errors.surname.error}
        name="surname"
        value={values.surname}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        type="text"
        placeholder="Enter your email..."
        touched={touched.email}
        error={errors.email.error}
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        type="text"
        placeholder="Username"
        touched={touched.username}
        error={errors.username.error}
        name="username"
        value={values.username}
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
        Sign Up
      </Button>
      <Divider />
      <Button
        type="submit"
        isMaxWidth
      >
        <img src="/assets/svg/google.svg" alt="google" />
        &nbsp;
        Sign in with Google
      </Button>
    </Form>
  );
};
