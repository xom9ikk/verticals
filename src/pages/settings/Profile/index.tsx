/* eslint-disable @typescript-eslint/no-shadow */
import useWith from 'ramda/src/useWith';
import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';

import { Avatar } from '@comp/Avatar';
import { Button } from '@comp/Button';
import { Form } from '@comp/Form';
import { Input } from '@comp/Input';
import { SyncInput } from '@comp/SyncInput';
import validator from '@helpers/validator';
import { validatorProfileForm } from '@helpers/validator/form/profile';
import { UserActions } from '@store/actions';
import {
  getBio, getName, getSurname, getUsername,
} from '@store/selectors';
import { useForm } from '@use/form';
import { useOpenFiles } from '@use/openFiles';

interface IFormValidatedState {
  name: string;
  surname: string;
  bio: string;
}

export const Profile: FC = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { openFiles } = useOpenFiles();

  const username = useSelector(getUsername);
  const name = useSelector(getName);
  const surname = useSelector(getSurname);
  const bio = useSelector(getBio);

  const initialState = {
    name,
    surname,
    bio,
  };

  const {
    handleChange, handleSubmit, handleBlur, values, errors, touches,
  } = useForm<IFormValidatedState>(
    initialState,
    useWith(dispatch, [UserActions.effect.updatePersonalData]),
    validatorProfileForm,
  );

  const handleClick = async () => {
    const [file] = await openFiles('image/x-png,image/jpeg', false) || [];
    dispatch(UserActions.effect.uploadAvatar(file));
  };

  const handleDelete = (event: React.SyntheticEvent) => {
    event.preventDefault();
    dispatch(UserActions.effect.removeAvatar());
  };

  return (
    <>
      <h1 className="settings__title">{t('Profile')}</h1>
      <div>
        <Form
          handleSubmit={handleSubmit}
          alignItems="left"
          isMaxWidth
        >
          <div className="profile-avatar">
            <Avatar size={150} />
            <div className="profile-avatar__controls">
              <div className="profile-avatar__controls-wrapper">
                <div
                  className="profile-avatar__button-upload"
                  onClick={handleClick}
                >
                  <img
                    src="/assets/svg/upload.svg"
                    alt="upload"
                  />
                  {t('Click to update')}
                </div>
                <button
                  className="profile-avatar__button-delete"
                  onClick={handleDelete}
                >
                  <img
                    src="/assets/svg/board/trash.svg"
                    alt="delete"
                  />
                </button>
              </div>
            </div>
          </div>
          <SyncInput
            type="text"
            name="username"
            label={t('Username')}
            isLight
            initialValue={username}
            action={UserActions.effect.updateUsername}
            validator={validator.text({ min: 2, name: t('Username') })}
          />
          <Input
            type="text"
            label={t('First name')}
            touched={touches.name}
            error={errors.name}
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            isLight
          />
          <Input
            type="text"
            label={t('Last name')}
            touched={touches.surname}
            error={errors.surname}
            name="surname"
            value={values.surname}
            onChange={handleChange}
            onBlur={handleBlur}
            isLight
          />
          <Input
            type="text"
            label={t('Bio')}
            touched={touches.bio}
            error={errors.bio}
            name="bio"
            value={values.bio}
            onChange={handleChange}
            onBlur={handleBlur}
            isMultiline
            isLight
          />
          <div className="settings__controls">
            <Button
              type="submit"
              modificator="primary"
              isMaxWidth
            >
              {t('Save changes')}
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};
