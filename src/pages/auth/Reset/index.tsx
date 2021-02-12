/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import useWith from 'ramda/src/useWith';
import { Input } from '@comp/Input';
import { Button } from '@comp/Button';
import { Form } from '@comp/Form';
import { useForm } from '@use/form';
import { AuthActions } from '@store/actions';
import { validatorResetForm } from '@helpers/validator/form/reset';

interface IFormValidatedState {
  email: string;
}

const initialState = {
  email: '',
};

export const Reset: FC = () => {
  const dispatch = useDispatch();

  const {
    handleChange, handleSubmit, handleBlur, values, errors, touches,
  } = useForm<IFormValidatedState>(
    initialState,
    useWith(dispatch, [AuthActions.reset]),
    validatorResetForm,
  );

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
