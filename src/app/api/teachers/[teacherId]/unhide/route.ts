import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function POST(req: Request, { params }: { params: Promise<{ teacherId: string }> }) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { teacherId } = await params;

    await prisma.teacher.update({
      where: { id: teacherId },
      data: { reason: null },
    });

    return NextResponse.json({ message: 'Teacher unhidden successfully' }, { status: 200 });
  } catch (error) {
    console.error('POST /api/teachers/[teacherId]/unhide error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
