export interface DecodedJWTModel {
  sub: string;
  role: string;
  orgId: string;
  exp: number;
  iat: number;
  email: string;
  userId: string;
  userName: string;
}
