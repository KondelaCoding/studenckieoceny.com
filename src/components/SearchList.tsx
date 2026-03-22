import { ReturnedTeacherProps } from '@/types/types';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import StarRatingDisplay from './StarRatingDisplay';
import Link from 'next/link';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { UserPlus, TriangleAlert } from 'lucide-react';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from './ui/tooltip';

const reasonTooltip = (reason: string) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <TriangleAlert className="text-primary" />
        </TooltipTrigger>
        <TooltipContent>
          <p>{reason}</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

const SearchList = ({ teachers }: { teachers: ReturnedTeacherProps[] }) => {
  return (
    <div>
      {teachers.length === 0 ? (
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
            {teachers.map((teacher: ReturnedTeacherProps) => (
              <TableRow key={teacher.id}>
                <TableCell className="w-full">
                  <Link href={`/profil/${teacher.id}`} className="inline-flex items-center gap-3">
                    <Avatar className="uppercase">
                      <AvatarFallback>{teacher.name.split('+')[0][0] ?? ''}</AvatarFallback>
                    </Avatar>
                    {teacher.reason ? reasonTooltip(teacher.reason) : null}
                    <span className="hover:underline">{teacher.name}</span>
                  </Link>
                </TableCell>
                <TableCell>{teacher.subjects ? teacher.subjects.split(',')[0] : 'null'}</TableCell>
                <TableCell>
                  {teacher.universities ? teacher.universities.split(',')[0] : 'null'}
                </TableCell>
                <TableCell>
                  <StarRatingDisplay
                    numberOfVotes={teacher.numberOfVotes}
                    totalValue={teacher.totalRatingValue}
                  />
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
