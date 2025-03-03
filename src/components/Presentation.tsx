"use client";

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import StarRating from "./StarRating";
import QuadrantAnalysis from "./QuadrantAnalysis";
import { VenetianMask, ChartLine, Globe } from "lucide-react";
import { ChartConfig, ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";
import { PolarAngleAxis, PolarGrid, Radar, RadarChart } from "recharts";

const chartData = [
  { trait: "Klarowność", value: 50 },
  { trait: "Zaangażowanie", value: 60 },
  { trait: "Interakcja", value: 40 },
  { trait: "Organizacja", value: 100 },
  { trait: "Humor", value: 80 },
];

const chartConfig = {
  trait: {
    label: "trait",
    color: "hsl(var(--chart-1))",
  },
} satisfies ChartConfig;

const cardData = [
  {
    header: "Prowadzący z całej Polski",
    description: "Jury w postaci studentów mogących ocenić dowolnego prowadzącego na dowolnej uczelni.",
    icon: <Globe />,
    presentation: [1, 2, 3, 4, 5].map((i) => <StarRating key={i} rating={i} />),
  },
  {
    header: "Innowacyjny sposób oceniania",
    description: "Zainspirowany rozsyłanymi zdjęciami, wykres 'cech' prowadzącego",
    icon: <ChartLine />,
    presentation: (
      <ChartContainer config={chartConfig} className="mx-auto aspect-square max-h-[250px] w-full">
        <RadarChart data={chartData}>
          <ChartTooltip cursor={true} content={<ChartTooltipContent />} />
          <PolarAngleAxis dataKey="trait" />
          <PolarGrid />
          <Radar dataKey="value" fill="var(--primary)" fillOpacity={0.6} />
        </RadarChart>
      </ChartContainer>
    ),
  },
  {
    header: "Anonimowość",
    description: "Oceny prowadzących są anonimowe, a ich wyniki są w pełni jawne.",
    icon: <VenetianMask />,
  },
];

const Presentation = () => {
  return (
    <div className="grid grid-cols-1 my-20 gap-10 lg:grid-cols-3">
      {cardData.map((card) => (
        <Card key={card.header}>
          <CardHeader>
            <CardTitle className="inline-flex gap-3 items-center">
              {card.icon}
              {card.header}
            </CardTitle>
            <CardDescription>{card.description}</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center flex-col items-center gap-5">{card.presentation}</CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Presentation;
