import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, password, name } = body;

    const user = await prisma.user.create({
      data: {
        email,
        password,
        name,
      },
    });

    return NextResponse.json({ user }, { status: 201 });
  } catch (error: unknown) {
    // Prisma unique constraint (email already exists)
    if (error instanceof Error && 'code' in error && error.code === 'P2002') {
      return NextResponse.json({ error: 'User with this email already exists' }, { status: 409 });
    }

    console.error('POST /api/users error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
