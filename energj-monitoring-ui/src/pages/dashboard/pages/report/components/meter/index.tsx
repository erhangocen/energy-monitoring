import { NotFoundDataTable } from '@/components/ui/table/not-found-data';
import { MeterProps } from './data/types';
import { MeterContext, MeterProvider } from './hooks/use-meter';
import { Skeleton } from '@/components/ui/skeleton';
import { MeterItem } from './components/meter-item';

export default function Meter(props: MeterProps) {
  if (!props.organizationId) {
    return <NotFoundDataTable />;
  }
  return (
    <MeterProvider
      meterIds={props.meterIds}
      organizationId={props.organizationId}
    >
      <MeterContext.Consumer>
        {({ isLoading, reportData }) => (
          <div>
            {isLoading ? (
              <div className='grid grid-cols-12 gap-3 pt-4'>
                <div className='col-span-12 md:col-span-6'>
                  {<Skeleton className='h-60' />}
                </div>
                <div className='col-span-12 md:col-span-6'>
                  {<Skeleton className='h-60' />}
                </div>
                <div className='col-span-12 md:col-span-6'>
                  {<Skeleton className='h-60' />}
                </div>
                <div className='col-span-12 md:col-span-6'>
                  {<Skeleton className='h-60' />}
                </div>
              </div>
            ) : reportData?.length == 0 ? (
              <NotFoundDataTable />
            ) : (
              <div>
                <div className='grid grid-cols-12 gap-3 pt-4'>
                  {reportData?.map((data, i) => (
                    <div
                      key={i}
                      className={`col-span-12 md:col-span-${reportData.length == 1 ? 12 : 6}`}
                    >
                      <MeterItem data={data} />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </MeterContext.Consumer>
    </MeterProvider>
  );
}
