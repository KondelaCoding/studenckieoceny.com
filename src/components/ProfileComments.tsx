"use client";

import { useEffect, useState } from "react";
import { Comment, Months } from "@/types";
import { Separator } from "./ui/separator";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { Skeleton } from "./ui/skeleton";
import { Button } from "./ui/button";

const ProfileComments = ({ teacherId }: { teacherId: string }) => {
  const [comments, setComments] = useState<Comment[]>([]);
  const [filteredComments, setFilteredComments] = useState<Comment[]>(comments.slice(0, 4));
  const [isLoading, setIsLoading] = useState(true);
  const [commentCount, setCommentCount] = useState(5);

  const date = (timestamp: number) => {
    const date = new Date(timestamp);
    const day = date.getDate();
    const month = (date.getMonth() + 1).toString() as unknown as keyof typeof Months;
    const year = date.getFullYear();
    const hours = date.getHours();
    const minutes = date.getMinutes();

    const formattedTime = `${hours < 9 ? `0${hours}` : hours}:${minutes < 9 ? `0${minutes}` : minutes}`;

    if (date.getDate() === new Date().getDate()) {
      return "Dzisiaj " + formattedTime;
    } else if (date.getDate() === new Date().getDate() - 1) {
      return "Wczoraj " + formattedTime;
    } else {
      return `${day} ${Months[month]} ${year}`;
    }
  };

  const increaseCommentCount = () => {
    setCommentCount((prev) => prev + 3);
  };

  useEffect(() => {
    const fetchComments = async () => {
      const response = await fetch(`${process.env.BASE_URL}/api/teacher-comments?teacherId=${teacherId}`);
      const data = await response.json();
      setComments(data);
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
          <div key={comment.id} className="grid grid-cols-[auto_1fr] gap-5 w-full">
            <Avatar className="capitalize w-12 h-12">
              <AvatarFallback>{comment.user.slice(0, 2)}</AvatarFallback>
            </Avatar>
            <div className="flex flex-col gap-1">
              <div className="inline-flex items-center w-full gap-5">
                <h4 className="scroll-m-20 text-xl font-semibold tracking-tight">{comment.user}</h4>
                <p className="text-muted-foreground">{date(comment.timestamp)}</p>
              </div>
              <Separator orientation="horizontal" />
              <q className="italic text-muted-foreground">
                {comment.comment.length > 150 ? comment.comment.slice(0, 150) + "..." : comment.comment}
              </q>
            </div>
          </div>
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
