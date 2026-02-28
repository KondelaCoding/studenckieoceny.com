'use client';

import { useEffect, useState } from 'react';
import { Separator } from './ui/separator';
import { Skeleton } from './ui/skeleton';
import { Button } from './ui/button';
import axios from 'axios';
import { Comment } from '@/types/types';
import UserComment from './UserComment';

const ProfileComments = ({ teacherId, isAdmin }: { teacherId: string; isAdmin: boolean }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filteredComments, setFilteredComments] = useState<Comment[]>(comments.slice(0, 4));
  const [isLoading, setIsLoading] = useState(true);
  const [commentCount, setCommentCount] = useState(5);

  const increaseCommentCount = () => {
    setCommentCount((prev) => prev + 3);
  };

  useEffect(() => {
    const fetchComments = async () => {
      const response = await axios.get(
        `${process.env.NEXT_PUBLIC_BASE_URL}/api/teachers/${teacherId}/comments`,
      );

      const comments = response.data.comments ?? [];
      setComments(comments);
      setIsLoading(false);
    };

    fetchComments();
  }, [teacherId]);

  useEffect(() => {
    setFilteredComments(comments.slice(0, commentCount));
  }, [comments, commentCount]);

  return (
    <div className="w-full flex flex-col gap-10 overflow-y-auto max-h-[70vh] h-full">
      {isLoading ? (
        <div className="w-full h-full">
          <div className="grid grid-cols-[auto_1fr] gap-5 w-full">
            <Skeleton className="w-12 h-12 rounded-full aspect-square" />
            <div className="flex flex-col gap-1 w-full">
              <div className="inline-flex items-center w-full">
                <Skeleton className="w-32 h-5 my-1" />
              </div>
              <Separator orientation="horizontal" />
              <div>
                <Skeleton className="w-full h-5 my-2" />
                <Skeleton className="w-1/2 h-5 my-2" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-5 w-full mt-10">
            <Skeleton className="w-12 h-12 rounded-full aspect-square" />
            <div className="flex flex-col gap-1 w-full">
              <div className="inline-flex items-center w-full">
                <Skeleton className="w-32 h-5 my-1" />
              </div>
              <Separator orientation="horizontal" />
              <div>
                <Skeleton className="w-full h-5 my-2" />
                <Skeleton className="w-1/2 h-5 my-2" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-5 w-full mt-10">
            <Skeleton className="w-12 h-12 rounded-full aspect-square" />
            <div className="flex flex-col gap-1 w-full">
              <div className="inline-flex items-center w-full">
                <Skeleton className="w-32 h-5 my-1" />
              </div>
              <Separator orientation="horizontal" />
              <div>
                <Skeleton className="w-full h-5 my-2" />
                <Skeleton className="w-1/2 h-5 my-2" />
              </div>
            </div>
          </div>
          <div className="grid grid-cols-[auto_1fr] gap-5 w-full mt-10">
            <Skeleton className="w-12 h-12 rounded-full aspect-square" />
            <div className="flex flex-col gap-1 w-full">
              <div className="inline-flex items-center w-full">
                <Skeleton className="w-32 h-5 my-1" />
              </div>
              <Separator orientation="horizontal" />
              <div>
                <Skeleton className="w-full h-5 my-2" />
                <Skeleton className="w-1/2 h-5 my-2" />
              </div>
            </div>
          </div>
        </div>
      ) : filteredComments.length ? (
        filteredComments.map((comment) => (
          <UserComment key={comment.id} comment={comment} isAdmin={isAdmin} />
        ))
      ) : (
        <span className="w-full text-center text-muted-foreground">
          Ten prowadzący nie otrzymał jeszcze komentarzy 😔 <br />
          Bądź pierwszy i podziel się <span className="text-primary">swoją</span> opinią!
        </span>
      )}
      {filteredComments.length < comments.length ? (
        <Button variant="ghost" onClick={increaseCommentCount}>
          Pokaż więcej
        </Button>
      ) : null}
    </div>
  );
};

export default ProfileComments;
