export interface ISetAuthInfo {
  readonly token: string;
  readonly refreshToken: string;
}

export interface ISignUp {
  readonly email: string;
  readonly password: string;
  readonly name: string;
  readonly surname: string;
  readonly username: string;
}

export type ISignIn = {
  readonly password: string;
} & ({ readonly username: string } | { readonly email: string });

export interface IResetPassword {
  readonly email: string;
}

export interface IChangePassword {
  readonly oldPassword: string;
  readonly newPassword: string;
}
