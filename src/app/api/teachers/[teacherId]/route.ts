// PATCH- Update teacher (admin or owner only)
// DELETE- Delete teacher (admin only)

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: { teacherId: string } }) {
  try {
    const { teacherId } = params;

    const teacher = await prisma.teacher.findUnique({ where: { id: teacherId } });
    if (!teacher) {
      return NextResponse.json({ error: 'Teacher not found' }, { status: 404 });
    }

    return NextResponse.json(teacher, { status: 200 });
  } catch (error) {
    console.error('GET /api/teachers/[teacherId] error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

//TODO: implement when needed
// export async function PATCH(req: Request) {}
// export async function DELETE(req: Request) {}
