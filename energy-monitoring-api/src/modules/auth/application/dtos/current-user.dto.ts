export class CurrentUserDto {
  sub: string;
  role: string;
  orgId: string | null;
  userId: string;
  userName: string;
  email: string;
}
