export class UserDto {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user';
  organizationId: string | null;
  organizationName?: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<UserDto>) {
    Object.assign(this, partial);
  }
}
