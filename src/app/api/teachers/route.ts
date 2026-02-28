import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

//TODO: [Task - pagination] OMGGGGG implement filtering by query idk why its so bad now
export async function GET() {
  try {
    const teachers = await prisma.teacher.findMany({ where: { reason: null } });

    return NextResponse.json({ teachers }, { status: 200 });
  } catch (error) {
    console.error('GET /api/teachers error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

//TODO: remove teacher university table, just make 2 cols in teacher for primary and secondary university
export async function POST(req: Request) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ data: null, error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, subjects, primaryUniversity, secondaryUniversity } = body;
    const universityIds = Array.from(
      new Set([primaryUniversity, secondaryUniversity].filter(Boolean).map((id) => String(id))),
    );

    const teacher = await prisma.teacher.create({
      data: {
        name,
        subjects,
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

    //TODO: notify admin about new teacher added

    return NextResponse.json({ teacher, message: 'Teacher added successfully' }, { status: 201 });
  } catch (error) {
    console.error('POST /api/teachers error:', error);
    return NextResponse.json({ error: 'Failed to add teacher' }, { status: 500 });
  }
}
