/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { FC } from 'react';
import { Button } from '@comp/Button';
import { useForm } from '@/use/form';
import { validatorAccountForm } from '@/helpers/validatorAccountForm';
import { LockedInput } from '@comp/LockedInput';
import { useSelector } from 'react-redux';
import { getEmail } from '@/store/selectors';

interface IAccount {

}

interface IInitialFormState {
  [key: string]: {
    defaultValue: string | number | null,
    error?: string;
    isValid: boolean,
  }
}

export const Account: FC<IAccount> = () => {
  const email = useSelector(getEmail);

  const initialState: IInitialFormState = {
    email: {
      defaultValue: email,
      error: 'Invalid email address',
      isValid: false,
    },
  };

  const handlerSubmit = async () => {
    console.log('handlerSubmit', values);
  };

  const {
    handleChange, handleBlur, values, errors,
  } = useForm(initialState, handlerSubmit, validatorAccountForm, true);
  console.log(values);
  // @ts-ignore

  console.log(initialState, '=>', errors);

  return (
    <>
      <h1 className="settings__title">Account</h1>
      <div>
        <LockedInput
          type="email"
          name="email"
          label="Email"
          touched
          error={errors.email.error}
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
      </div>
    </>
  );
};
