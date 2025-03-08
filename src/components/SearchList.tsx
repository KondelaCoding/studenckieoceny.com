import { ReturnedTeacherProps } from "@/types";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StarRating from "./StarRating";
import Link from "next/link";
import DrawerDemo from "./Drawer";

const SearchList = async ({ teachers, query }: { teachers: ReturnedTeacherProps[]; query?: string }) => {
  const filterName = (name: string) => {
    return query ? name.toLowerCase().includes(query.toLowerCase()) : true;
  };

  // TODO: v1.1 - Implement filtering by subject and university
  // const filterSubject = (subjects: string) => {
  //   console.log("subjects", subjects);
  //   console.log("query", query);
  //   return query && subjects ? subjects.toLowerCase().includes(query.toLowerCase()) : true;
  // };

  const filteredTeachers = teachers.filter((teacher) => filterName(teacher.name)) || [];

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
            filteredTeachers.map((teacher: ReturnedTeacherProps) => (
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
