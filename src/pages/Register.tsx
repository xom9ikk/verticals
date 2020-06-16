/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { FC } from 'react';
import { Link } from 'react-router-dom';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Form } from '../components/Form';
import { useRegister } from '../use/register';
import { useForm } from '../use/form';
import { validatorRegisterForm } from '../helpers/validatorRegisterForm';
import { Divider } from '../components/Divider';

const initialState = {
  firstName: {
    defaultValue: '',
    error: 'Can\'t be blank',
    isValid: false,
  },
  lastName: {
    defaultValue: '',
    error: 'Can\'t be blank',
    isValid: false,
  },
  email: {
    defaultValue: '',
    error: 'Invalid email address',
    isValid: false,
  },
  password: {
    defaultValue: '',
    error: 'Can’t be blank',
    isValid: false,
  },
};

export const Register: FC = () => {
  const handlerSubmit = async () => {
    console.log('submit', values);
    await register(values);
  };
  const { register } = useRegister();
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
        touched={touched.firstName}
        error={errors.firstName.error}
        name="firstName"
        value={values.firstName}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        type="text"
        placeholder="Last name"
        touched={touched.lastName}
        error={errors.lastName.error}
        name="lastName"
        value={values.lastName}
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
        <img src="/svg/google.svg" alt="google" />
        &nbsp;
        Sign in with Google
      </Button>
    </Form>
  );
};
