"use client";

import { useRef } from "react";
import { Flag } from "lucide-react";
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
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";

export function ReportTeacherDrawer({ teacherId }: { teacherId: string }) {
  const messageRef = useRef<HTMLTextAreaElement>(null);

  const handleReportTeacher = async () => {
    try {
      const response = await fetch("/api/report-teacher", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          teacherId,
          message: messageRef.current?.value,
        }),
      });
      if (response.ok) {
        toast.success("Pomyślnie zgłoszono profil.");
      } else {
        throw new Error("Failed to report teacher");
      }
    } catch {
      toast.error("Wystąpił błąd podczas zgłaszania profilu, spróbuj ponownie później.");
    }
  };

  return (
    <div>
      <Toaster closeButton={true} />
      <Drawer>
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <DrawerTrigger asChild>
                <Button variant="secondary" className="lg:mr-2 xl:mr-0">
                  <Flag />
                </Button>
              </DrawerTrigger>
            </TooltipTrigger>
            <TooltipContent>
              <span className="text-sm">Zgłoś</span>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <DrawerContent>
          <div className="mx-auto w-full max-w-sm text-center">
            <DrawerHeader>
              <DrawerTitle>Zgłoś profil</DrawerTitle>
              <DrawerDescription>
                Taki prowadzący nie istnieje? Znalazłeś błąd? Zgłoś to <span className="text-primary">nam</span>!
              </DrawerDescription>
            </DrawerHeader>
            <div className="p-4 pb-0 flex flex-col items-center gap-5">
              <div className="flex flex-col items-center justify-center gap-3 w-full">
                <Textarea
                  placeholder="Napisz dlaczego zgłaszasz ten profil."
                  className="h-32 w-full"
                  ref={messageRef}
                />
              </div>
            </div>
            <DrawerFooter>
              <DrawerClose onClick={handleReportTeacher} asChild>
                <Button className="w-full mt-20">Zgłoś</Button>
              </DrawerClose>
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

export default ReportTeacherDrawer;
