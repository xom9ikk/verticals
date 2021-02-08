/* eslint-disable @typescript-eslint/no-use-before-define,no-shadow,@typescript-eslint/no-shadow */
import React, { FC } from 'react';
import { Input } from '@comp/Input';
import { Button } from '@comp/Button';
import { Form } from '@comp/Form';
import { IFormValues, useForm } from '@use/form';
import { validatorProfileForm } from '@helpers/validatorProfileForm';
import { SyncInput } from '@comp/SyncInput';
import { Avatar } from '@comp/Avatar';
import { useDispatch, useSelector } from 'react-redux';
import {
  getBio, getName, getSurname, getUsername,
} from '@store/selectors';
import { UserActions } from '@store/actions';
import validator from '@helpers/validator';
import { useOpenFiles } from '@use/openFiles';

interface IProfile {

}

export const Profile: FC<IProfile> = () => {
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

  const handleSubmitForm = ({ name, surname, bio }: IFormValues) => {
    console.log('Profile handlerSubmit', values);
    dispatch(UserActions.updatePersonalData({
      name: name!,
      surname: surname!,
      bio: bio!,
    }));
  };

  const handleClick = async () => {
    const [file] = await openFiles('image/x-png,image/jpeg', false) || [];
    dispatch(UserActions.uploadAvatar(file));
  };

  const handleDelete = (event: React.SyntheticEvent) => {
    event.preventDefault();
    console.log('handleDelete');
    dispatch(UserActions.removeAvatar());
  };

  const {
    handleChange, handleSubmit, handleBlur, values, errors, touches,
  } = useForm(initialState, handleSubmitForm, validatorProfileForm);

  return (
    <>
      <h1 className="settings__title">Profile</h1>
      <div>
        <Form
          handleSubmit={handleSubmit}
          alignItems="left"
          isMaxWidth
        >
          <div
            className="profile-avatar"
          >
            <Avatar
              size={150}
            />
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
                  Click to update
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
            label="Username"
            isLight
            initialValue={username}
            action={UserActions.updateUsername}
            validator={validator.text({ min: 2, name: 'Username' })}
          />
          <Input
            type="text"
            label="First name"
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
            label="Last name"
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
            label="Bio"
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
              Save changes
            </Button>
          </div>
        </Form>
      </div>
    </>
  );
};
