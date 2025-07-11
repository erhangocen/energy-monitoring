import { ReportContext, ReportProvider } from './hooks/use-report';
import SelectFromApi from '@/components/ui/select-from-api';
import { QueryKeys } from '@/data/query-keys';
import { useGetOrganizationOptions } from '@/hooks/organization/use-get-organization-list';
import { OptionType } from '@/components/data/option-type';
import { useGetMeterOptions } from '@/hooks/meter/use-get-meter-list';
import { NotFoundDataTable } from '@/components/ui/table/not-found-data';
import Meter from './components/meter';

export default function Report() {
  return (
    <ReportProvider>
      <ReportContext.Consumer>
        {({
          handleSelectedOrganization,
          handleSelectedMeter,
          state,
          isLoading,
        }) =>
          !isLoading && (
            <div>
              <div className='text-lg font-medium'>Enerji Raporları</div>
              <div className='flex flex-col gap-4'>
                <div className='grid grid-cols-12 gap-3 pt-4'>
                  <div className='col-span-12 md:col-span-4'>
                    <div className='grid grid-cols-12 gap-3 pt-4'>
                      <div className='col-span-12 md:col-span-12'>
                        Organizasyon
                      </div>
                      <div className='col-span-12 md:col-span-12'>
                        <SelectFromApi
                          queryKey={QueryKeys.OrganizationList}
                          fetchOptions={useGetOrganizationOptions}
                          defaultOptions={
                            !state.isAdmin
                              ? [
                                  {
                                    value: state.selectedOrganization ?? '',
                                    label: state.defaultOrganizationName ?? '',
                                  },
                                ]
                              : []
                          }
                          onChange={(value) => {
                            handleSelectedOrganization(
                              (value as OptionType)?.value
                            );
                            handleSelectedMeter([]);
                          }}
                          placeholder='Organizasyon seçiniz...'
                          value={state.selectedOrganization}
                          disabled={!state.isAdmin}
                        />
                      </div>
                    </div>
                  </div>
                  <div className='col-span-12 md:col-span-8'>
                    <div className='grid grid-cols-12 gap-3 pt-4'>
                      <div className='col-span-12 md:col-span-12'>Sayaç</div>
                      <div className='col-span-12 md:col-span-12'>
                        <SelectFromApi
                          queryKey={QueryKeys.OrganizationList}
                          fetchOptions={(x) =>
                            useGetMeterOptions({
                              ...x,
                              organizationId: state.selectedOrganization,
                            })
                          }
                          defaultOptions={[]}
                          onChange={(value) => {
                            handleSelectedMeter(
                              (value as OptionType[])?.map((x) => x.value)
                            );
                          }}
                          placeholder='Sayaç seçiniz...'
                          value={state.selectedMeters}
                          multiple
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div>
                  <Meter
                    meterIds={state.selectedMeters}
                    organizationId={state.selectedOrganization}
                  />
                </div>
              </div>
            </div>
          )
        }
      </ReportContext.Consumer>
    </ReportProvider>
  );
}
