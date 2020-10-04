/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { FC } from 'react';
import { Input } from '@comp/Input';
import { Button } from '@comp/Button';
import { Form } from '@comp/Form';
import { useForm } from '@/use/form';
import { validatorProfileForm } from '@/helpers/validatorProfileForm';
import { LockedInput } from '@comp/LockedInput';
import { Avatar } from '@comp/Avatar';

const initialState = {
  username: {
    defaultValue: 'xom9ik',
    error: 'Can’t be blank',
    isValid: false,
  },
  name: {
    defaultValue: 'Max',
    error: 'Can’t be blank',
    isValid: false,
  },
  surname: {
    defaultValue: 'Romanyuta',
    error: 'Can’t be blank',
    isValid: false,
  },
  bio: {
    defaultValue: 'About me bio lorem ipsum sit dolor amet',
    error: 'Can’t be blank',
    isValid: false,
  },
};

interface IProfile {

}

export const Profile: FC<IProfile> = () => {
  const handlerSubmit = async () => {
    console.log('submit', values);
    // dispatch(AuthActions.signIn({
    //   email: values.email,
    //   password: values.password,
    // }));
  };

  const handleUpload = () => {

  };

  const handleDelete = () => {

  };

  const {
    handleChange, handleSubmit, handleBlur, values, errors, touched,
  } = useForm(initialState, handlerSubmit, validatorProfileForm);

  return (
    <>
      <h1 className="settings__title">Profile</h1>
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
                <button
                  className="profile-avatar__button-upload"
                  onClick={handleUpload}
                >
                  <img
                    src="/assets/svg/upload.svg"
                    alt="upload"
                  />
                  Click to update
                </button>
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
          <LockedInput
            type="text"
            label="Username"
            touched={touched.username}
            error={errors.username.error}
            name="username"
            value={values.username}
            onChange={handleChange}
            onBlur={handleBlur}
            isLight
          />
          <Input
            type="text"
            label="First name"
            touched={touched.name}
            error={errors.name.error}
            name="name"
            value={values.name}
            onChange={handleChange}
            onBlur={handleBlur}
            isLight
          />
          <Input
            type="text"
            label="Last name"
            touched={touched.surname}
            error={errors.surname.error}
            name="surname"
            value={values.surname}
            onChange={handleChange}
            onBlur={handleBlur}
            isLight
          />
          <Input
            type="text"
            label="Bio"
            touched={touched.bio}
            error={errors.bio.error}
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
