import Navbar from "@/components/Navbar";
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { UserPlus } from "lucide-react";
import AddTeacherForm from "@/components/AddTeacherForm";

const Page = () => {
  return (
    <div className="min-h-[calc(100vh-20rem)] flex justify-center items-center -mt-5">
      <Navbar />
      <Card className="max-w-min my-10 mx-10">
        <CardHeader>
          <CardTitle className="flex items-center gap-3">
            <UserPlus />
            Dodaj prowadzącego
          </CardTitle>
          <CardDescription>Jeśli nie znalazłeś prowadzącego, dodaj go do naszej bazy!</CardDescription>
        </CardHeader>
        <AddTeacherForm />
      </Card>
    </div>
  );
};

export default Page;
