import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TraitChart from "./TraitChart";
import { Skeleton } from "./ui/skeleton";
import { ChartLine, MessageCircle, Trophy, PiggyBank } from "lucide-react";
import ProfileComments from "./ProfileComments";
import { ReturnedTeacherProps } from "@/types";
import { Separator } from "./ui/separator";
import AddCommentDrawer from "./AddCommentDrawer";
import { Button } from "./ui/button";

const ProfileCards = async ({ teacherData }: { teacherData: ReturnedTeacherProps }) => {
  return (
    <div className="bg-background rounded-xl border grid grid-cols-2 w-full p-5 gap-5">
      <Card className="w-full">
        <CardHeader className="flex-row justify-between items-center gap-10">
          <div>
            <CardTitle className="inline-flex gap-3 items-center">
              <MessageCircle />
              Komentarze
            </CardTitle>
            <CardDescription>Komentarze studentów na temat prowadzącego.</CardDescription>
          </div>
          <AddCommentDrawer teacherId={teacherData.id} />
        </CardHeader>
        <Separator orientation="horizontal" />
        <CardContent className="flex justify-between h-full flex-col items-end gap-5">
          <div className="w-full flex">
            <ProfileComments teacherId={teacherData.id} />
          </div>
        </CardContent>
      </Card>
      <div className="grid grid-rows-2 gap-5">
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full flex justify-center flex-col p-10 items-center z-20 backdrop-blur-[1px] backdrop-brightness-25 text-center">
            <h3 className="text-2xl font-semibold tracking-tight text-muted-foreground">
              Niestety funkcja wykresu <q className="text-primary">cech</q> prowadzącego nie jest jeszcze gotowa 😔
            </h3>
            <br /> <br />
            <p>
              Chcesz
              <span className="text-primary font-bold"> przyśpieszyć </span>rozwój? <br />
              Piwko tego nie zrobi ale przynajmniej poprawi mi humor ♥️
            </p>
            {/* TODO: Add link to patreon or something */}
            <Button className="mt-10">
              <PiggyBank />
              Wesprzyj
            </Button>
          </div>
          <CardHeader>
            <CardTitle className="inline-flex gap-3 items-center">
              <ChartLine /> Wykres cech
            </CardTitle>
            <CardDescription>Wykres przedstawiający podstawowe cechy prowadzącego.</CardDescription>
          </CardHeader>
          <Separator orientation="horizontal" />
          <CardContent className="flex justify-center flex-col items-center gap-5 h-full">
            <TraitChart />
          </CardContent>
        </Card>
        <Card className="relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full flex justify-center flex-col p-10 items-center z-20 backdrop-blur-[1px] backdrop-brightness-25 text-center">
            <h3 className="text-2xl font-semibold tracking-tight text-muted-foreground">
              Niestety funkcja <q className="text-primary">odznak</q> nie jest jeszcze gotowa 😔
            </h3>
            <br /> <br />
            <p>
              Chcesz
              <span className="text-primary font-bold"> przyśpieszyć </span>rozwój? <br />
              Piwko tego nie zrobi ale przynajmniej poprawi mi humor ♥️
            </p>
            {/* TODO: Add link to patreon or something */}
            <Button className="mt-10">
              <PiggyBank />
              Wesprzyj
            </Button>
          </div>
          <CardHeader>
            <CardTitle className="inline-flex gap-3 items-center">
              <Trophy />
              Odznaki
            </CardTitle>
            <CardDescription>Odznaki uzyskane przez prowadzącego.</CardDescription>
          </CardHeader>
          <Separator orientation="horizontal" />
          <CardContent className="flex justify-center gap-5 h-full flex-wrap relative">
            {true ? (
              <>
                <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center text-muted-foreground">
                  Ten prowadzący nie otrzymał jeszcze odznak 😔
                </span>
                <Skeleton className="w-20 h-20 rounded-full aspect-square" />
                <Skeleton className="w-20 h-20 rounded-full aspect-square" />
                <Skeleton className="w-20 h-20 rounded-full aspect-square" />
              </>
            ) : null}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProfileCards;
