/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { FC, useState } from 'react';
import { Button } from '@comp/Button';
import { SyncInput } from '@comp/SyncInput';
import { useDispatch, useSelector } from 'react-redux';
import { getEmail } from '@store/selectors';
import { AuthActions, UserActions } from '@store/actions';
import validator from '@helpers/validator';
import { Modal } from '@comp/Modal';
import { Form } from '@comp/Form';
import { Input } from '@comp/Input';
import { IFormValues, useForm } from '@use/form';
import { validatorChangePasswordForm } from '@helpers/validatorChangePasswordForm';

interface IAccount {

}

const initialState = {
  oldPassword: '',
  newPassword: '',
};

export const Account: FC<IAccount> = () => {
  const dispatch = useDispatch();
  const email = useSelector(getEmail);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpenModal(true);
  };

  const handlePositive = () => {
    // console.log('===vakues', values);
  };

  const handleNegative = () => {
    setIsOpenModal(false);
  };

  const handleClose = () => {
    setIsOpenModal(false);
  };

  const handleSubmitForm = ({ oldPassword, newPassword }: IFormValues) => {
    console.log('===handleSubmitForm', oldPassword, newPassword);
    dispatch(AuthActions.changePassword({
      oldPassword: oldPassword!,
      newPassword: newPassword!,
    }));
  };

  const {
    handleChange, handleSubmit, handleBlur, values, errors, touches,
  } = useForm(initialState, handleSubmitForm, validatorChangePasswordForm);

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
                  onClick={handleClick}
                >
                  Change password
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpenModal}
        negative="Cancel"
        positive="Change Password"
        onPositive={handlePositive}
        onNegative={handleNegative}
        onClose={handleClose}
        type="submit"
        renderWrapper={(children) => (
          <Form
            handleSubmit={handleSubmit}
          >
            {children}
          </Form>
        )}
      >
        <h1 className="dialog__title">
          Change password
        </h1>
        <Input
          type="password"
          placeholder="Old password"
          touched={touches.oldPassword}
          error={errors.oldPassword}
          name="oldPassword"
          value={values.oldPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          isLight
        />
        <Input
          type="password"
          placeholder="New password"
          touched={touches.newPassword}
          error={errors.newPassword}
          name="newPassword"
          value={values.newPassword}
          onChange={handleChange}
          onBlur={handleBlur}
          isLight
        />
      </Modal>
    </>
  );
};
