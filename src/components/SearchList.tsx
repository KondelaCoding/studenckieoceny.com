import { ReturnedTeacherProps } from "@/types";
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import StarRatingDisplay from "./StarRatingDisplay";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { UserPlus } from "lucide-react";

const SearchList = ({ teachers, query }: { teachers: ReturnedTeacherProps[]; query?: string }) => {
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
      {filteredTeachers.length === 0 ? (
        <div className="flex flex-col items-center gap-5 text-center text-muted-foreground">
          <p>Nie znaleziono prowadzącego pasującego do kryteriów wyszukiwania.</p>
          <Link href="/dodaj">
            <Button>
              <UserPlus />
              Dodaj prowadzącego
            </Button>
          </Link>
        </div>
      ) : (
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
            {filteredTeachers.map((teacher: ReturnedTeacherProps) => (
              <TableRow key={teacher.id}>
                <TableCell>
                  <Link href={`/profil/${teacher.id}`} className="inline-flex items-center gap-3">
                    <Avatar className="uppercase">
                      <AvatarFallback>{teacher.name.split("+")[0][0] ?? ""}</AvatarFallback>
                    </Avatar>
                    <span className="hover:underline">{teacher.name}</span>
                  </Link>
                </TableCell>
                <TableCell>{teacher.subjects ? teacher.subjects.split(",")[0] : "null"}</TableCell>
                <TableCell>{teacher.universities ? teacher.universities.split(",")[0] : "null"}</TableCell>
                <TableCell>
                  <StarRatingDisplay numberOfVotes={teacher.numberOfVotes} totalValue={teacher.totalRatingValue} />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default SearchList;
