import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
  }

  try {
    const user = await prisma.user.findUnique({ where: { id: userId } });

    if (!user) {
      return new Response(JSON.stringify({ error: 'User not found' }), { status: 404 });
    }

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    console.error('GET /api/users/[userId] error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}

//TODO: implement when needed
// export async function PATCH(req: Request) {}
// export async function DELETE(req: Request) {}
