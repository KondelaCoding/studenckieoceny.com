import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request, { params }: { params: { teacherId: string } }) {
  try {
    const { teacherId } = params;

    await prisma.teacher.update({
      where: { id: teacherId },
      data: { reason: null },
    });
  } catch (error) {
    console.error('POST /api/teachers/[teacherId]/unhide error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
