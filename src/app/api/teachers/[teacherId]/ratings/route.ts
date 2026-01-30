import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function PATCH(req: Request, { params }: { params: { teacherId: string } }) {
  try {
    const { teacherId } = params;
    const body = await req.json();
    const { rating } = body;

    if (rating === undefined) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await prisma.teacher.update({
      where: { id: teacherId },
      data: {
        totalRatingValue: { increment: rating },
        numberOfVotes: { increment: 1 },
      },
    });

    return NextResponse.json({ message: 'Rating updated successfully' }, { status: 200 });
  } catch (error) {
    console.error('PATCH /api/teachers/[teacherId]/ratings error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
