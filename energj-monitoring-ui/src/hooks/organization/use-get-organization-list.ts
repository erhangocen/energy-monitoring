import { OptionType } from '@/components/data/option-type';
import { OrganizationListRequestParams } from '@/data/models/request-models/organization/organization-list-request-params';
import { OrganizationListResponseModel } from '@/data/models/response-models/organization/organization-list-response-model';
import { post } from '@/network';

export const useGetOrganizationList = async (
  params: OrganizationListRequestParams
) => {
  const organizations = await post<OrganizationListResponseModel[]>(
    'organization/list',
    {
      ...params,
    }
  );
  return organizations;
};

export const useGetOrganizationOptions = async (
  params: OrganizationListRequestParams
) => {
  const locationList = await useGetOrganizationList(params);
  const options: OptionType[] = locationList
    .filter((x) => x.id !== undefined && x.name !== undefined)
    .map((location) => ({
      label: location.name ?? '',
      value: location.id ?? '',
    }));

  return options;
};
