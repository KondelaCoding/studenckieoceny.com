import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: { teacherId: string } }) {
  try {
    const { teacherId } = await params;

    if (!teacherId) {
      return NextResponse.json({ error: 'Teacher ID is required' }, { status: 400 });
    }

    const comments = await prisma.comment.findMany({ where: { teacherId } });

    if (comments.length === 0) {
      return NextResponse.json({ comments: [] }, { status: 200 });
    }

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error('GET /api/teachers/[teacherId]/comments error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: { teacherId: string } }) {
  try {
    const { teacherId } = await params;
    const body = await req.json();
    const { user, comment } = body;

    if (!user || !comment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    await prisma.comment.create({
      data: {
        teacherId,
        user,
        comment,
      },
    });

    return NextResponse.json({ message: 'Comment added successfully' }, { status: 200 });
  } catch (error) {
    console.error('POST /api/teachers/[teacherId]/comments error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
