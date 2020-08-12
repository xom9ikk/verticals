/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { FC } from 'react';
import { Input } from '@comp/Input';
import { Button } from '@comp/Button';
import { Form } from '@comp/Form';
import { useForm } from '@/use/form';
import { validatorResetForm } from '@/helpers/validatorResetForm';

const initialState = {
  email: {
    defaultValue: '',
    error: 'Invalid email address',
    isValid: false,
  },
};

export const Reset: FC = () => {
  const handlerSubmit = async () => {
    console.log('submit', values);
  };
  const {
    handleChange, handleSubmit, handleBlur, values, errors, touched,
  } = useForm(initialState, handlerSubmit, validatorResetForm);

  return (
    <Form
      title="What’s your email?"
      subtitle="Enter your mail to reset your password."
      handleSubmit={handleSubmit}
    >
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
      <Button
        type="submit"
        modificator="primary"
        isMaxWidth
      >
        Send a password reset email
      </Button>
    </Form>
  );
};
