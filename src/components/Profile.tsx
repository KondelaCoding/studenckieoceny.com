import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ReturnedTeacherProps } from "@/types";
import ProfileCards from "./ProfileCards";
import { Separator } from "./ui/separator";
import StarRatingDisplay from "./StarRatingDisplay";
import { User, BookOpenText, University, CalendarClock } from "lucide-react";

const Profile = ({ teacherData }: { teacherData: ReturnedTeacherProps }) => {
  const seperatedSubjects = teacherData.subjects.split(",");
  const seperatedUniversities = teacherData.universities.split(",");
  const date =
    new Date(teacherData.timestamp).getDate() +
    "." +
    (new Date(teacherData.timestamp).getMonth() + 1) +
    "." +
    new Date(teacherData.timestamp).getFullYear();
  return (
    <div className="grid grid-cols-[auto_1fr] grid-rows-1 w-full">
      <div className="flex flex-col items-center py-10 -mt-5 max-w-lg gap-5 px-6 w-min">
        <Avatar className="uppercase w-40 h-40 text-4xl border mx-14">
          <AvatarFallback>{teacherData.name.split(" ")[0][0] ?? ""}</AvatarFallback>
        </Avatar>
        <div className="w-full flex flex-col gap-5">
          <h2 className="scroll-m-20 mt-5 text-3xl font-semibold tracking-tight transition-colors capitalize inline-flex gap-3 items-center">
            <User size={30} />
            {teacherData.name}
          </h2>
          <StarRatingDisplay totalValue={teacherData.totalRatingValue} numberOfVotes={teacherData.numberOfVotes} />
          <Separator orientation="horizontal" />
          <div className="flex flex-col gap-10">
            <div className="flex gap-3 flex-col">
              <span className="inline-flex items-center gap-3">
                <BookOpenText size={24} />
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Przedmioty</h3>
              </span>
              <ul className="list-disc">
                {seperatedSubjects.map((subject, index) => (
                  <li key={index} className="ml-6">
                    {subject}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-3 flex-col">
              <span className="inline-flex items-center gap-3">
                <University size={24} />
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Uczelnie</h3>
              </span>
              <ul className="list-disc space-y-3">
                {seperatedUniversities.map((subject, index) => (
                  <li key={index} className="ml-6">
                    {subject}
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex gap-3 flex-col">
              <span className="inline-flex items-center gap-3">
                <CalendarClock size={24} />
                <h3 className="scroll-m-20 text-2xl font-semibold tracking-tight">Data dodania</h3>
              </span>
              <ul className="list-disc">
                <li className="ml-6">{date}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <ProfileCards teacherData={teacherData} />
    </div>
  );
};

export default Profile;
