import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function PATCH(req: Request, { params }: { params: Promise<{ teacherId: string }> }) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { teacherId } = await params;
    const body = await req.json();
    const { rating } = body;

    if (rating === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const teacher = await prisma.teacher.update({
      where: { id: teacherId },
      data: {
        totalRatingValue: { increment: rating },
        numberOfVotes: { increment: 1 },
      },
    });

    return NextResponse.json({ teacher, message: 'Rating updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('PATCH /api/teachers/[teacherId]/ratings error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
