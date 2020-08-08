export interface IAuth {
  accessToken: string;
  refreshToken: string;
}

export interface ISignIn {
  email: string;
  password: string;
}

export interface ISignUp {
  firstName: string;
  lastName: string;
  gender: string;
  email: string;
  password: string;
}
