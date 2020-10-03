/* eslint-disable @typescript-eslint/no-use-before-define */
import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { IRootState } from '@/store/reducers/state';
import { Input } from '@comp/Input';
import { Button } from '@comp/Button';
import { Form } from '@comp/Form';
import { useForm } from '@/use/form';
import { validatorProfileForm } from '@/helpers/validatorProfileForm';
import { LockedInput } from '@comp/LockedInput';

interface ISettings {
}

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

export const Settings: FC<ISettings> = () => {
  const { isOpenSettings } = useSelector((state: IRootState) => state.system);

  const handlerSubmit = async () => {
    console.log('submit', values);
    // dispatch(AuthActions.signIn({
    //   email: values.email,
    //   password: values.password,
    // }));
  };

  const {
    handleChange, handleSubmit, handleBlur, values, errors, touched,
  } = useForm(initialState, handlerSubmit, validatorProfileForm);

  return (
    <>
      {isOpenSettings && (
      <div className="settings">
        <div className="settings__sidebar">
          <h1 className="settings__title">Settings</h1>
        </div>
        <div className="settings__content">
          <div className="settings__content-inner">
            <h1 className="settings__title">Profile</h1>
            <div>
              <Form
                handleSubmit={handleSubmit}
                alignItems="left"
                isMaxWidth
              >
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
          </div>
        </div>
      </div>
      )}
    </>
  );
};
