import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const { email } = await req.json();

    if (!email) {
      return new Response(JSON.stringify({ error: 'Email is required' }), { status: 400 });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return new Response(JSON.stringify({ error: 'Unauthorized' }), { status: 401 });
    }

    return new Response(JSON.stringify({ user }), { status: 200 });
  } catch (error) {
    console.error('POST /api/users/validate error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
