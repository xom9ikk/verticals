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
  name: validator.text(name, 2, 'First name'),
  surname: validator.text(surname, 2, 'Last name'),
  username: validator.text(username, 2, 'Username'),
  bio: validator.text(bio, 2, 'Bio'),
});
