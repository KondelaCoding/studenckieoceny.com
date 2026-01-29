// GET- List all teachers
// POST- Add a new teacher

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

//TODO: OMGGGGG implement filtering by query idk why its so bad now
export async function GET() {
  try {
    const teachers = await prisma.teacher.findMany({ where: { reason: null } });

    return new Response(JSON.stringify(teachers ?? []), { status: 200 });
  } catch (error) {
    console.error('GET /api/teachers error:', error);
    return NextResponse.json({ message: 'Something went wrong' }, { status: 500 });
  }
}
