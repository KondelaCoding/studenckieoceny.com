'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import StarRatingDisplay from './StarRatingDisplay';
import { VenetianMask, ChartLine, Globe } from 'lucide-react';
import TraitChart from './TraitChart';

const cardData = [
  {
    header: 'Prowadzący z całej Polski',
    description: 'Jury w postaci studentów mogących ocenić dowolne zajęcia na dowolnej uczelni.',
    icon: <Globe />,
    presentation: (
      <div className="w-fit gap-3 flex flex-col h-full items-start">
        {[1, 2, 3, 4, 5].map((i) => (
          <StarRatingDisplay key={i} numberOfVotes={i} totalValue={i * i} />
        ))}
      </div>
    ),
  },
  {
    header: 'Innowacyjny sposób oceniania',
    description: "Zainspirowany rozsyłanymi zdjęciami, wykres 'cech' prowadzącego zajęcia",
    icon: <ChartLine />,
    // TODO: Change label in tooltip from "value" to something else
    presentation: <TraitChart />,
  },
  {
    header: 'Anonimowość',
    description: 'Oceny zajęć są anonimowe, a ich wyniki są w pełni jawne.',
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
          <CardContent className="flex justify-center flex-col items-center gap-5 h-full">
            {card.presentation}
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default Presentation;
