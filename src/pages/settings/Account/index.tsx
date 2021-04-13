/* eslint-disable @typescript-eslint/no-use-before-define */
import useWith from 'ramda/src/useWith';
import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Button } from '@comp/Button';
import { Form } from '@comp/Form';
import { Input } from '@comp/Input';
import { Modal } from '@comp/Modal';
import { SyncInput } from '@comp/SyncInput';
import validator from '@helpers/validator';
import { validatorChangePasswordForm } from '@helpers/validator/form/changePassword';
import { AuthActions, UserActions } from '@store/actions';
import { getEmail } from '@store/selectors';
import { useForm } from '@use/form';

interface IFormValidatedState {
  oldPassword: string;
  newPassword: string;
}

const initialState = {
  oldPassword: '',
  newPassword: '',
};

export const Account: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const email = useSelector(getEmail);

  const [isOpenModal, setIsOpenModal] = useState<boolean>(false);

  const handleClick = () => {
    setIsOpenModal(true);
  };

  const handlePositive = () => { };

  const handleNegative = () => {
    setIsOpenModal(false);
  };

  const handleClose = () => {
    setIsOpenModal(false);
  };

  const {
    handleChange, handleSubmit, handleBlur, values, errors, touches,
  } = useForm<IFormValidatedState>(
    initialState,
    useWith(dispatch, [AuthActions.effect.changePassword]),
    validatorChangePasswordForm,
  );

  return (
    <>
      <h1 className="settings__title">{t('Account')}</h1>
      <div>
        <SyncInput
          type="email"
          name="email"
          label={t('Email')}
          isLight
          initialValue={email}
          action={UserActions.effect.updateEmail}
          validator={validator.email({ max: 64 })}
          style={{ marginBottom: 20 }}
        />
        <div className="input">
          <div className="input__wrapper">
            <div className="input__inner">
              <span className="input__label">{t('Password')}</span>
              <div className="input__holder">
                <Button
                  type="button"
                  isMaxWidth
                  onClick={handleClick}
                >
                  {t('Change password')}
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Modal
        isOpen={isOpenModal}
        negative={t('Cancel')}
        positive={t('Change Password')}
        onPositive={handlePositive}
        onNegative={handleNegative}
        onClose={handleClose}
        type="submit"
        renderWrapper={(children) => (
          <Form handleSubmit={handleSubmit}>
            {children}
          </Form>
        )}
      >
        <h1 className="dialog__title">
          {t('Change password')}
        </h1>
        <Input
          type="password"
          placeholder={t('Old password')}
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
          placeholder={t('New password')}
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
