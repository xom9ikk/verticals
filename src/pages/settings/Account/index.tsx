/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { FC } from 'react';
import { Button } from '@comp/Button';
import { SyncInput } from '@comp/SyncInput';
import { useSelector } from 'react-redux';
import { getEmail } from '@/store/selectors';
import { UserActions } from '@/store/actions';
import validator from '@/helpers/validator';

interface IAccount {

}

export const Account: FC<IAccount> = () => {
  const email = useSelector(getEmail);

  return (
    <>
      <h1 className="settings__title">Account</h1>
      <div>
        <SyncInput
          type="email"
          name="email"
          label="Email"
          isLight
          initialValue={email}
          action={UserActions.updateEmail}
          validator={validator.email({ max: 64 })}
          style={{ marginBottom: 20 }}
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
