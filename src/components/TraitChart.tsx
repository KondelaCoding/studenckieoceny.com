'use client';

import { RadarChart, PolarAngleAxis, PolarGrid, Radar } from 'recharts';
import { ChartConfig, ChartTooltipContent, ChartContainer, ChartTooltip } from './ui/chart';

// TODO: Mock data, replace later
const chartData = [
  { trait: 'Klarowność', value: 50 },
  { trait: 'Zaangażowanie', value: 60 },
  { trait: 'Interakcja', value: 40 },
  { trait: 'Organizacja', value: 100 },
  { trait: 'Humor', value: 80 },
];

const chartConfig = {
  trait: {
    label: 'trait',
    color: 'hsl(var(--chart-1))',
  },
} satisfies ChartConfig;

const TraitChart = () => {
  // TODO: maybe replace trait names with just one letter and name it something fancy
  return (
    <ChartContainer config={chartConfig} className="mx-auto max-h-[250px] w-full">
      <RadarChart data={chartData}>
        <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
        <PolarAngleAxis dataKey="trait" />
        <PolarGrid />
        <Radar dataKey="value" fill="var(--primary)" fillOpacity={0.6} />
      </RadarChart>
    </ChartContainer>
  );
};

export default TraitChart;
