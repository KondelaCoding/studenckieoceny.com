import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request, { params }: { params: { userId: string } }) {
  const { userId } = params;

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return NextResponse.json({ error: 'User not found' }, { status: 404 });
    }

    return NextResponse.json({ user }, { status: 200 });
  } catch (error) {
    console.error('GET /api/users/[userId] error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

//TODO: implement when needed
// export async function PATCH(req: Request) {}
// export async function DELETE(req: Request) {}
