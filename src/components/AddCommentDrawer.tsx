'use client';

import { useState, useRef } from 'react';
import { MessageCirclePlus, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';
import { toast } from 'sonner';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import Link from 'next/link';

export function AddCommentDrawer({ teacherId }: { teacherId: string }) {
  const [message, setMessage] = useState<string | null>(null);
  const [ratingValue, setRatingValue] = useState(0);
  const [isRatingClicked, setIsRatingClicked] = useState(false);

  const nickRef = useRef<HTMLInputElement>(null);
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const setRating = (index: number) => {
    setRatingValue(index);
  };

  const handleClick = (index: number) => {
    setRating(index);
    setIsRatingClicked(true);
  };

  const postRating = async (rating: number) => {
    if (!isRatingClicked) return false;
    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/rating`, {
        method: 'PATCH',
        body: JSON.stringify({ teacherId: teacherId, rating }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        toast.success('Ocena dodata pomyślnie!');
      } else {
        throw new Error('Failed to add rating');
      }
    } catch {
      toast.error('Wystąpił błąd podczas dodawania oceny, spróbuj ponownie później.');
    }
    return true;
  };

  const handleAddComment = async () => {
    if (!messageRef.current?.value) return false;
    const nick = nickRef.current?.value || 'Anonim';
    const message = messageRef.current?.value;

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/comments`, {
        method: 'POST',
        body: JSON.stringify({ teacherId: teacherId, user: nick, comment: message }),
        headers: {
          'Content-Type': 'application/json',
        },
      });
      if (response.ok) {
        toast.success('Komentarz dodany pomyślnie przez ' + nick + '!');
      } else {
        throw new Error('Failed to add comment');
      }
    } catch {
      toast.error('Wystąpił błąd podczas dodawania komentarza, spróbuj ponownie później.');
    }
    setMessage(null);
    return true;
  };

  // ? Adds comment and rating
  const handleAddOpinion = async () => {
    const isCommentAdded = await handleAddComment();
    const isRatingAdded = await postRating(ratingValue);

    if (!isCommentAdded && !isRatingAdded) {
      toast.error('Wystąpił błąd podczas dodawania komentarza, spróbuj ponownie później.');
    }
  };

  return (
    <div>
      <Drawer onClose={() => setIsRatingClicked(false)}>
        <DrawerTrigger asChild>
          <Button>
            <MessageCirclePlus />
            Skomentuj
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm text-center">
            <DrawerHeader>
              <DrawerTitle>Napisz komentarz</DrawerTitle>
              <DrawerDescription>
                Powiedz <span className="text-primary">anonimowo</span> co myślisz o tych zajęciach.
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0 flex flex-col items-center gap-5">
              <div className="flex flex-col items-center justify-center gap-3 w-full">
                <Input placeholder="Nick" className="w-full" ref={nickRef} />
                <Textarea
                  placeholder="Napisz to co myślisz."
                  className="h-32 w-full"
                  ref={messageRef}
                  onChange={() => setMessage(messageRef.current?.value ?? null)}
                />
              </div>
              <div
                className={`inline-flex justify-center w-full duration-200 ${
                  isRatingClicked ? 'gap-2 opacity-100' : 'gap-1 opacity-50'
                }`}
              >
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={40}
                    onClick={() => handleClick(star)}
                    onMouseEnter={() => (isRatingClicked ? null : setRating(star))}
                    fill={star <= ratingValue ? 'var(--invisible-primary)' : 'var(--accent)'}
                    className={star <= ratingValue ? 'text-primary' : 'text-accent'}
                  />
                ))}
              </div>
            </div>
            <DrawerFooter>
              <p className="leading-7 text-muted-foreground text-sm mt-10">
                Dodając komentarz akceptujesz
                <Link href="/regulamin" className="text-primary underline hover:text-foreground">
                  regulamin.
                </Link>
              </p>
              {message || isRatingClicked ? (
                <DrawerClose onClick={handleAddOpinion} asChild>
                  <Button className="w-full">Dodaj</Button>
                </DrawerClose>
              ) : (
                <DrawerClose onClick={handleAddOpinion} asChild>
                  <Button className="w-full" disabled>
                    Dodaj
                  </Button>
                </DrawerClose>
              )}
              <DrawerClose asChild>
                <Button variant="outline">Anuluj</Button>
              </DrawerClose>
            </DrawerFooter>
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  );
}

export default AddCommentDrawer;
