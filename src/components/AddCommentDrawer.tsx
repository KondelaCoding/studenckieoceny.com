"use client";

import * as React from "react";
import { MessageCirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Toaster } from "./ui/sonner";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import StarRating from "./StarRating";
import { Input } from "./ui/input";

export function AddCommentDrawer({ teacherId }: { teacherId: string }) {
  const [message, setMessage] = React.useState<string | null>(null);

  const nickRef = React.useRef<HTMLInputElement>(null);
  const messageRef = React.useRef<HTMLTextAreaElement>(null);
  //   ! const starRatingRef = React.useRef<HTMLDivElement>(null);

  const handleAddComment = async () => {
    if (!messageRef.current?.value) return;
    const nick = nickRef.current?.value || "Anonim";
    const message = messageRef.current?.value;
    // ! const rating = starRatingRef.current?.getAttribute("data-value");

    try {
      const response = await fetch(`http://localhost:3000/api/comments`, {
        method: "POST",
        body: JSON.stringify({ teacherId: teacherId, user: nick, comment: message }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) toast.success("Komentarz dodany pomyślnie przez " + nick + "!");
      else throw new Error("Failed to add comment");
    } catch {
      toast.error("Wystąpił błąd podczas dodawania komentarza, spróbuj ponownie później.");
    }
    setMessage(null);
    // window.location.reload();
    // TODO: only fetch new comments, don't reload the page. This will be hard bc we need to pass data to sibling components
  };
  return (
    <div>
      <Toaster closeButton={true} />
      <Drawer>
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
                Powiedz <span className="text-primary">anonimowo</span> co myślisz o tym prowadzącym
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
              {/* <StarRating totalValue={1} numberOfVotes={1} /> TODO: Add star rating when comments will be replaced with reviews */}
            </div>
            <DrawerFooter>
              <p className="leading-7 text-muted-foreground text-sm mt-20">Dodając komentarz akceptujesz regulamin.</p>
              {message ? (
                <DrawerClose onClick={handleAddComment} asChild>
                  <Button className="w-full">Dodaj</Button>
                </DrawerClose>
              ) : (
                <DrawerClose disabled onClick={handleAddComment} asChild>
                  <Button className="w-full">Dodaj</Button>
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
