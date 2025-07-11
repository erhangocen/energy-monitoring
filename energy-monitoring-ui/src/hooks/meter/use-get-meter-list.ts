import { OptionType } from '@/components/data/option-type';
import { MeterListRequestParams } from '@/data/models/request-models/meter/meter-list-request-params';
import { MeterListResponseModel } from '@/data/models/response-models/meter/meter-list-response-model';
import { post } from '@/network';

export const useGetMeterList = async (params: MeterListRequestParams) => {
  const meters = await post<MeterListResponseModel[]>('meter/list', {
    ...params,
    search: params.searchName,
  });
  return meters;
};

export const useGetMeterOptions = async (params: MeterListRequestParams) => {
  const meterList = await useGetMeterList(params);
  const options: OptionType[] = meterList
    .filter((x) => x.id !== undefined && x.name !== undefined)
    .map((meter) => ({
      label: meter.name ?? '',
      value: meter.id ?? '',
    }));

  return options;
};
