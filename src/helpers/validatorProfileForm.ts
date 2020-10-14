import validator from './validator';

interface IValidatorProfileForm {
  name: string,
  surname: string,
  username: string,
  bio: string,
}

export const validatorProfileForm = ({
  name, surname, username, bio,
}: IValidatorProfileForm) => ({
  name: validator.text({ min: 2, name: 'First name' })(name),
  surname: validator.text({ min: 2, name: 'Last name' })(surname),
  username: validator.text({ min: 2, name: 'Username' })(username),
  bio: validator.text({ min: 0, name: 'Bio' })(bio),
});
