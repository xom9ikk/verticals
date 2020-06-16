/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { FC, useState } from 'react';
import { Header } from '../components/Header';
import { Input } from '../components/Input';
import { Button } from '../components/Button';
import { Form } from '../components/Form';
import { useReset } from '../use/reset';
import { useForm } from '../use/form';
import { validatorResetForm } from '../helpers/validatorResetForm';

const initialState = {
  email: {
    defaultValue: '',
    error: 'Invalid email address',
    isValid: false,
  },
};

export const Reset: FC = () => {
  const [isSend, setIsSend] = useState<boolean>(false);

  const handlerSubmit = async () => {
    console.log('submit', values);
    await reset(values);
  };
  const { reset } = useReset();
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
