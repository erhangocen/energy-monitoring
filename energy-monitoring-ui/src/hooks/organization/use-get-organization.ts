import { OrganizationGetResponseModel } from '@/data/models/response-models/organization/organization-get-response-model';
import { get } from '@/network';

export const useGetOrganization = async (id: string) => {
  const organization: OrganizationGetResponseModel = await get(
    'organization/' + id
  );
  return organization;
};
