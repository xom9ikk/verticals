/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { FC } from 'react';
import { Input } from '@comp/Input';
import { Button } from '@comp/Button';
import { Form } from '@comp/Form';
import { IFormValues, useForm } from '@use/form';
import { validatorResetForm } from '@helpers/validatorResetForm';
import { AuthActions } from '@store/actions';
import { useDispatch } from 'react-redux';

const initialState = {
  email: '',
};

export const Reset: FC = () => {
  const dispatch = useDispatch();

  const handleSubmitForm = ({ email }: IFormValues) => {
    dispatch(AuthActions.reset({
      email: email!,
    }));
  };

  const {
    handleChange, handleSubmit, handleBlur, values, errors, touches,
  } = useForm(initialState, handleSubmitForm, validatorResetForm);

  return (
    <Form
      title="What’s your email?"
      subtitle="Enter your mail to reset your password."
      handleSubmit={handleSubmit}
    >
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
