import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';

export async function GET(req: Request, { params }: { params: Promise<{ teacherId: string }> }) {
  try {
    const { teacherId } = await params;

    if (!teacherId) {
      return NextResponse.json({ error: 'Teacher ID is required' }, { status: 400 });
    }

    const comments = await prisma.comment.findMany({ where: { teacherId } });

    return NextResponse.json({ comments }, { status: 200 });
  } catch (error) {
    console.error('GET /api/teachers/[teacherId]/comments error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function POST(req: Request, { params }: { params: Promise<{ teacherId: string }> }) {
  try {
    const session = await auth();
    if (!session?.user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { teacherId } = await params;
    const body = await req.json();
    const { user, comment } = body;

    if (!user || !comment) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newComment = await prisma.comment.create({
      data: {
        teacherId,
        user,
        comment,
      },
    });

    return NextResponse.json({ comment: newComment, message: 'Comment added successfully' }, { status: 201 });
  } catch (error) {
    console.error('POST /api/teachers/[teacherId]/comments error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
