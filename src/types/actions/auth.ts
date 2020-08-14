export interface ISetAuthInfo {
  token: string;
  refreshToken: string;
}

export interface ISignUp {
  email: string;
  password: string;
  name: string;
  surname: string;
  username: string;
}

export type ISignIn = {
  password: string;
} & ({ username: string } | { email: string });

export interface IResetPassword {
  email: string;
}
