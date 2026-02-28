import { Star, Dot } from 'lucide-react';

const StarRatingDisplay = ({
  numberOfVotes,
  totalValue,
}: {
  numberOfVotes: number;
  totalValue: number;
}) => {
  const calculateRating = (totalValue: number, numberOfVotes: number) => {
    if (numberOfVotes === 0) return 0;
    return parseFloat((totalValue / numberOfVotes).toFixed(1));
  };
  return (
    <div className="flex flex-col items-center">
      <div className="inline-flex gap-1 w-full">
        <div className="inline-flex gap-1">
          {[1, 2, 3, 4, 5].map((star) => (
            <Star
              key={star}
              size={24}
              fill={
                star <= calculateRating(totalValue, numberOfVotes)
                  ? 'var(--invisible-primary)'
                  : 'var(--accent)'
              }
              className={
                star <= calculateRating(totalValue, numberOfVotes) ? 'text-primary' : 'text-accent'
              }
            />
          ))}
        </div>
        <Dot size={24} fill="var(--accent)" className="text-muted-foreground" />
        <div className="text-muted-foreground">
          {calculateRating(totalValue, numberOfVotes)}
          {` (${numberOfVotes})`}
        </div>
      </div>
    </div>
  );
};

export default StarRatingDisplay;
