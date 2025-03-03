import { Star } from "lucide-react";

const StarRating = ({ rating }: { rating: number }) => {
  return (
    <div className="flex items-center gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <Star
          key={star}
          size={24}
          fill={star <= rating ? "var(--primary)" : "var(--accent)"}
          className={star <= rating ? "text-[var(--primary)]" : "text-[var(--accent)]"}
        />
      ))}
    </div>
  );
};

export default StarRating;
