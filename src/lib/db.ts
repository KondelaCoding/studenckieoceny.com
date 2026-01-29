import { Prisma } from '@/generated/prisma';
import { prisma } from '@/lib/prisma';
import { Comment as CommentType, ReturnedTeacherProps, User as UserType } from '@/types';

type TeacherWithUniversities = Prisma.TeacherGetPayload<{
  include: { teacherUniversities: { include: { university: true } } };
}>;

export const init = () => prisma;

const mapTeacher = (teacher: TeacherWithUniversities): ReturnedTeacherProps => ({
  id: teacher.id,
  name: teacher.name,
  totalRatingValue: teacher.totalRatingValue,
  numberOfVotes: teacher.numberOfVotes,
  subjects: teacher.subjects,
  universities: teacher.teacherUniversities
    .map((tu) => tu.university?.name)
    .filter(Boolean)
    .join(', '),
  timestamp: teacher.timestamp.getTime(),
  reason: teacher.reason,
});

const teacherInclude = {
  teacherUniversities: {
    include: {
      university: true,
    },
  },
} satisfies Prisma.TeacherInclude;

export const addTeacher = async (teacher: {
  name: string;
  subjects: string;
  universities: Array<string | number | null>;
}) => {
  const universityIds = Array.from(
    new Set(teacher.universities.filter(Boolean).map((id) => String(id))),
  );

  await prisma.teacher.create({
    data: {
      name: teacher.name,
      subjects: teacher.subjects,
      teacherUniversities: universityIds.length
        ? {
            create: universityIds.map((universityId) => ({
              university: {
                connect: { id: universityId },
              },
            })),
          }
        : undefined,
    },
  });
};

export const getAllTeachers = async () => {
  const teachers = await prisma.teacher.findMany({ include: teacherInclude });
  return teachers.map(mapTeacher);
};

export const getVisibleTeachers = async () => {
  const teachers = await prisma.teacher.findMany({
    where: { reason: null },
    include: teacherInclude,
    orderBy: { timestamp: 'desc' },
  });

  return teachers.map(mapTeacher);
};

export const getTeacherComments = async (teacherId: string) => {
  const comments = await prisma.comment.findMany({
    where: { teacherId },
    orderBy: { timestamp: 'desc' },
  });

  return comments.map((comment) => ({
    ...comment,
    timestamp: comment.timestamp.getTime(),
  }));
};

export const hideTeacher = async (id: string, reason: string) => {
  await prisma.teacher.update({
    where: { id },
    data: { reason },
  });
};

export const unhideTeacher = async (id: string) => {
  await prisma.teacher.update({
    where: { id },
    data: { reason: null },
  });
};

export const addComment = async (comment: Pick<CommentType, 'teacherId' | 'user' | 'comment'>) => {
  await prisma.comment.create({
    data: {
      teacherId: comment.teacherId,
      user: comment.user,
      comment: comment.comment,
    },
  });
};

export const getTeacherById = async (id: string) => {
  const teacher = await prisma.teacher.findUnique({
    where: { id },
    include: teacherInclude,
  });

  if (!teacher) return null;

  return mapTeacher(teacher);
};

export const updateRating = async (id: string, rating: number) => {
  try {
    await prisma.teacher.update({
      where: { id },
      data: {
        totalRatingValue: { increment: rating },
        numberOfVotes: { increment: 1 },
      },
    });
    return true;
  } catch (error) {
    console.error('Error updating rating:', error);
    return false;
  }
};

export const deleteTeacher = async (id: string) => {
  await prisma.teacher.delete({ where: { id } });
};
