export class OrganizationDto {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(partial: Partial<OrganizationDto>) {
    Object.assign(this, partial);
  }
}
