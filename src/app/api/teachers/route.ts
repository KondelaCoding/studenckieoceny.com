import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

//TODO: OMGGGGG implement filtering by query idk why its so bad now
export async function GET() {
  try {
    const teachers = await prisma.teacher.findMany({ where: { reason: null } });

    if (teachers.length === 0) {
      return new Response(JSON.stringify([]), { status: 200 });
    }
    return new Response(JSON.stringify(teachers), { status: 200 });
  } catch (error) {
    console.error('GET /api/teachers error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

//TODO: remove teacher university table, just make 2 cols in teacher for primary and secondary university
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { name, subjects, primaryUniversity, secondaryUniversity } = body;
    const universityIds = Array.from(
      new Set([primaryUniversity, secondaryUniversity].filter(Boolean).map((id) => String(id))),
    );

    await prisma.teacher.create({
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

    return NextResponse.json({ message: 'Teacher added successfully' }, { status: 201 });
  } catch (error) {
    console.error('POST /api/teachers error:', error);
    return NextResponse.json({ error: 'Failed to add teacher' }, { status: 500 });
  }
}
