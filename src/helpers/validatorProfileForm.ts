import validator from './validator';

export const validatorProfileForm = {
  name: validator.text({ min: 2, name: 'First name' }),
  surname: validator.text({ min: 2, name: 'Last name' }),
  username: validator.text({ min: 2, name: 'Username' }),
  bio: validator.text({ min: 0, max: 255, name: 'Bio' }),
};
