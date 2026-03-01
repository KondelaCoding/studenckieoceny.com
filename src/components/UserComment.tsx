'use client';

import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Comment as CommentType, Months } from '@/types/types';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Trash2 } from 'lucide-react';
import { useTransition } from 'react';
import { deleteCommentAction } from '@/actions/deleteComment';

const date = (timestamp: number) => {
  const d = new Date(timestamp);
  const day = d.getDate();
  const month = (d.getMonth() + 1).toString() as unknown as keyof typeof Months;
  const year = d.getFullYear();
  const hours = d.getHours();
  const minutes = d.getMinutes();

  const formattedTime = `${hours < 10 ? `0${hours}` : hours}:${
    minutes < 10 ? `0${minutes}` : minutes
  }`;

  if (day === new Date().getDate()) return 'Dzisiaj ' + formattedTime;
  if (day === new Date().getDate() - 1) return 'Wczoraj ' + formattedTime;

  return `${day} ${Months[month]} ${year}`;
};

const UserComment = ({ comment, isAdmin }: { comment: CommentType; isAdmin: boolean }) => {
  const [pending, startTransition] = useTransition();

  const handleDelete = () => {
    startTransition(async () => {
      await deleteCommentAction(comment.id);
    });
  };

  return (
    <div className="grid grid-cols-[auto_1fr] gap-5 w-full">
      <Avatar className="capitalize w-12 h-12">
        <AvatarFallback>{comment.user.slice(0, 2)}</AvatarFallback>
      </Avatar>
      <div className="flex flex-col gap-1">
        <div className="inline-flex items-center w-full gap-5 justify-between">
          <div className="inline-flex items-center gap-5">
            <h4 className="text-xl font-semibold">{comment.user}</h4>
            <p className="text-muted-foreground">{date(comment.timestamp)}</p>
          </div>
          {isAdmin && (
            <Button variant="ghost" size="icon" onClick={handleDelete} disabled={pending}>
              <Trash2 />
            </Button>
          )}
        </div>
        <Separator />
        <q className="italic text-muted-foreground">
          {comment.comment.length > 150 ? comment.comment.slice(0, 150) + '...' : comment.comment}
        </q>
      </div>
    </div>
  );
};

export default UserComment;
