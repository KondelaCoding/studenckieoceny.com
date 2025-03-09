import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import TraitChart from "./TraitChart";
import { Skeleton } from "./ui/skeleton";
import { ChartLine } from "lucide-react";

const ProfileComments = () => {
  return (
    <div className="bg-background rounded-xl border grid grid-cols-2 w-full p-5 gap-5">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Komentarze</CardTitle>
          <CardDescription>Komentarze studentów na temat prowadzącego.</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center flex-col items-center gap-5">
          <p>Brak komentarzy.</p>
        </CardContent>
      </Card>
      <div className="grid grid-rows-2 gap-5">
        <Card>
          <CardHeader>
            <CardTitle className="inline-flex gap-3 items-center">
              <ChartLine /> Wykres cech
            </CardTitle>
            <CardDescription>Wykres przedstawiający podstawowe cechy prowadzącego.</CardDescription>
          </CardHeader>
          <CardContent className="flex justify-center flex-col items-center gap-5 h-full">
            <TraitChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle>Odznaki</CardTitle>
            <CardDescription>Odznaki uzyskane przez prowadzącego.</CardDescription>
          </CardHeader>
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

export default ProfileComments;
