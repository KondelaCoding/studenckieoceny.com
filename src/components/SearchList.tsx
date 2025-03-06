import { TeacherProps } from "@/types";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StarRating from "./StarRating";
import Link from "next/link";
import DrawerDemo from "./Drawer";
import { split } from "@/lib/utils";

const SearchList = async ({ teachers, query }: { teachers: TeacherProps[]; query?: string }) => {
  //TODO: make the filters get the data from propper place instead of a query

  const getPrimarySubject = (subjects: string) => {
    return;
  };

  const filterName = (teacher: TeacherProps) => {
    return teacher.name.toLowerCase().includes((query ?? "").toLowerCase());
  };
  const filterSubject = (subjects: string[]) => {
    return subjects[0].toLowerCase().includes((query ?? "").toLowerCase());
  };
  const filterUniversity = (universities: string[]) => {
    return universities[0].toLowerCase().includes((query ?? "").toLowerCase());
  };

  const filteredTeachers =
    teachers.filter(
      (teacher) => filterName(teacher)
      // || filterSubject(subjectsArray) || filterUniversity(universitiesArray)
    ) || [];
  console.log(filteredTeachers);
  return (
    <div>
      <Table>
        <TableCaption>Lista Prowadzących</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Imię</TableHead>
            <TableHead>Główny przedmiot</TableHead>
            <TableHead>Główna uczelnia</TableHead>
            <TableHead>Ocena</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredTeachers.length === 0 ? (
            <TableRow>
              <TableCell colSpan={4} className="text-center space-y-5">
                <p>Nie znaleziono prowadzącego pasującego do kryteriów wyszukiwania.</p>
                <DrawerDemo />
              </TableCell>
            </TableRow>
          ) : (
            filteredTeachers.map((teacher: TeacherProps) => (
              <TableRow key={teacher.id}>
                <TableCell>
                  <Link href={`profile/${teacher.name.toLowerCase().replace(" ", "+")}`} className="hover:underline">
                    {teacher.name}
                  </Link>
                </TableCell>
                <TableCell>{teacher.subjects ? teacher.subjects.split(",")[0] : "null"}</TableCell>
                <TableCell>{teacher.universities ? teacher.universities.split(",")[0] : "null"}</TableCell>
                <TableCell>
                  <StarRating numberOfVotes={teacher.numberOfVotes} totalValue={teacher.totalRatingValue} />
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default SearchList;
