/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { FC } from 'react';
import { Button } from '@comp/Button';
import { Form } from '@comp/Form';
import { useForm } from '@/use/form';
import { validatorAccountForm } from '@/helpers/validatorAccountForm';
import { LockedInput } from '@comp/LockedInput';

const initialState = {
  email: {
    defaultValue: 'xom9ik.code@gmail.com',
    error: 'Invalid email address',
    isValid: false,
  },
};

interface IAccount {

}

export const Account: FC<IAccount> = () => {
  const handlerSubmit = async () => {
    console.log('submit', values);
    // dispatch(AuthActions.signIn({
    //   email: values.email,
    //   password: values.password,
    // }));
  };

  const {
    handleChange, handleSubmit, handleBlur, values, errors, touched,
  } = useForm(initialState, handlerSubmit, validatorAccountForm);

  return (
    <>
      <h1 className="settings__title">Account</h1>
      <div>
        <Form
          handleSubmit={handleSubmit}
          alignItems="left"
          isMaxWidth
        >
          <LockedInput
            type="email"
            label="Email"
            touched={touched.email}
            error={errors.email.error}
            name="email"
            value={values.email}
            onChange={handleChange}
            onBlur={handleBlur}
            isLight
          />
          <div className="input">
            <div className="input__wrapper">
              <div className="input__inner">
                <span className="input__label">Password</span>
                <div className="input__holder">
                  <Button
                    type="submit"
                    isMaxWidth
                  >
                    Change password
                  </Button>
                </div>
              </div>
            </div>
          </div>

        </Form>
      </div>
    </>
  );
};
