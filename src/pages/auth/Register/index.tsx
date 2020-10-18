/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import { Input } from '@comp/Input';
import { Button } from '@comp/Button';
import { Form } from '@comp/Form';
import { IFormValues, useForm } from '@/use/form';
import { validatorRegisterForm } from '@/helpers/validatorRegisterForm';
import { Divider } from '@comp/Divider';
import { AuthActions } from '@/store/actions';

const initialState = {
  name: '',
  surname: '',
  email: '',
  username: '',
  password: '',
};

export const Register: FC = () => {
  const dispatch = useDispatch();

  const handleSubmitForm = ({
    name, surname, email, username, password,
  } : IFormValues) => {
    dispatch(AuthActions.signUp({
      name: name!,
      surname: surname!,
      email: email!,
      username: username!,
      password: password!,
    }));
  };

  const {
    handleChange, handleSubmit, handleBlur, values, errors, touches,
  } = useForm(initialState, handleSubmitForm, validatorRegisterForm);

  return (
    <Form
      title="Hi there!"
      subtitle="Please create your account."
      handleSubmit={handleSubmit}
    >
      <Input
        type="text"
        placeholder="First name"
        touched={touches.name}
        error={errors.name}
        name="name"
        value={values.name}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        type="text"
        placeholder="Last name"
        touched={touches.surname}
        error={errors.surname}
        name="surname"
        value={values.surname}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        type="text"
        placeholder="Enter your email..."
        touched={touches.email}
        error={errors.email}
        name="email"
        value={values.email}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      <Input
        type="text"
        placeholder="Username"
        touched={touches.username}
        error={errors.username}
        name="username"
        value={values.username}
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
