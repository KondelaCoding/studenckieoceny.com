import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { reportTeacherNotification } from '@/services/mail';

export async function POST(req: Request, { params }: { params: { teacherId: string } }) {
  try {
    const { teacherId } = await params;
    const body = await req.json();
    const { reason } = body;

    if (!reason) {
      return NextResponse.json({ error: 'Missing reason field' }, { status: 400 });
    }

    await prisma.teacher.update({
      where: { id: teacherId },
      data: { reason },
    });

    await reportTeacherNotification(teacherId, reason);

    return NextResponse.json({ message: 'Teacher reported successfully' }, { status: 200 });
  } catch (error) {
    console.error('POST /api/teachers/[teacherId]/report error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
