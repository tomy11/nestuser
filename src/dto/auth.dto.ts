export interface AuthUser {
  userId: number;
  username: string;
  password: string;
}

export type AuthUserPayload = Omit<AuthUser, 'password'>;

export interface JwtPayload {
  username: string;
  sub: number;
}

export interface JwtValidateResult {
  userId: number;
  username: string;
}
