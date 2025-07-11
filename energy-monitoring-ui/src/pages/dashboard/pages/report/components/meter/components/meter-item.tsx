'use client';

import * as React from 'react';
import { CartesianGrid, Line, LineChart, XAxis, Tooltip } from 'recharts';
import { TooltipProps } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';
import { ReportMeter } from '@/data/models/response-models/report/report-get-response-model';

export const description = 'An interactive line chart';

const chartConfig = {
  views: {
    label: 'Enerji Ölçümü',
  },
  meter: {
    label: 'meter',
    color: 'red',
  },
} satisfies ChartConfig;

export type MeterItemProps = {
  data: ReportMeter;
};

const CustomTooltip = ({
  active,
  payload,
  label,
}: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className='rounded bg-white p-2 text-xs shadow'>
        <div>
          <b>
            {new Date(label as string).toLocaleString('tr-TR', {
              month: 'short',
              day: 'numeric',
              hour: '2-digit',
              minute: '2-digit',
            })}
          </b>
        </div>
        <div className='text-xs'>Ölçüm Değeri: {payload[0].payload.meter}</div>
        <div className='text-xs'>Değişim: {payload[0].payload.consumption}</div>
      </div>
    );
  }
  return null;
};

export const MeterItem: React.FC<MeterItemProps> = ({ data }) => {
  const [activeChart, setActiveChart] =
    React.useState<keyof typeof chartConfig>('meter');

  const chartData = data.readings.map((x, i) => ({
    date: x.timestamp,
    meter: x.index_kwh,
    consumption: x.consumption_kwh,
  }));

  return (
    <Card className='py-4 sm:py-0'>
      <CardHeader className='flex flex-col items-stretch border-b !p-0 sm:flex-row'>
        <div className='flex flex-1 flex-col justify-center gap-1 px-6 pb-3 sm:pb-0'>
          <CardTitle>{data.meterName} Sayacı</CardTitle>
          <CardDescription>Son 24 Saatteki Sayaç Değerleri</CardDescription>
        </div>
        <div className='flex'>
          {['meter'].map((key) => {
            const chart = key as keyof typeof chartConfig;
            return (
              <button
                key={chart}
                data-active={activeChart === chart}
                className='flex flex-1 flex-col justify-center gap-1 border-t px-6 py-4 text-left even:border-l data-[active=true]:bg-muted/50 sm:border-l sm:border-t-0 sm:px-8 sm:py-6'
                onClick={() => setActiveChart(chart)}
              >
                <span className='text-xs text-muted-foreground'>
                  {'Toplam Değer'}
                </span>
                <span className='text-lg font-bold leading-none sm:text-3xl'>
                  {data.totalConsumptionKwh}
                </span>
              </button>
            );
          })}
        </div>
      </CardHeader>
      <CardContent className='px-2 sm:p-6'>
        <ChartContainer
          config={chartConfig}
          className='aspect-auto h-[250px] w-full'
        >
          <LineChart
            accessibilityLayer
            data={chartData}
            margin={{
              left: 12,
              right: 12,
            }}
          >
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey='date'
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value.replace(' ', 'T'));
                return date.toLocaleTimeString('tr-TR', {
                  hour: '2-digit',
                  minute: '2-digit',
                });
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Line
              dataKey={activeChart}
              type='monotone'
              stroke={`var(--color-${activeChart})`}
              strokeWidth={2}
              dot={false}
            />
          </LineChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
};
