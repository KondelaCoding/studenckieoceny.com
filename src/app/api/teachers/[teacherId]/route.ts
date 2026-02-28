// PATCH- Update teacher (admin or owner only)
// DELETE- Delete teacher (admin only)

import { NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { hasPermission } from '@/lib/permissions';
import { getRequestUser } from '@/lib/auth-helpers';

export async function GET(req: Request, { params }: { params: Promise<{ teacherId: string }> }) {
  try {
    const { teacherId } = await params;
    const user = await getRequestUser(req);

    const teacher = await prisma.teacher.findUnique({
      where: { id: teacherId },
    });

    if (!teacher) {
      return NextResponse.json({ error: 'Teacher not found' }, { status: 404 });
    }

    if (!hasPermission(user?.role, 'teacher:read')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    // Teacher is suspended — only those with elevated permission can see the full record
    if (teacher.reason !== null) {
      if (!hasPermission(user?.role, 'teacher:read_reported')) {
        return NextResponse.json(
          { error: `This teacher is suspended: ${teacher.reason}` },
          { status: 403 },
        );
      }
    }

    return NextResponse.json({ teacher }, { status: 200 });
  } catch (error) {
    console.error('GET /api/teachers/[teacherId] error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

export async function DELETE(req: Request, { params }: { params: Promise<{ teacherId: string }> }) {
  try {
    const session = await auth();
    if (!session?.user || session.user.role !== 'admin') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { teacherId } = await params;

    await prisma.teacher.delete({ where: { id: teacherId } });

    return NextResponse.json({ message: 'Teacher deleted successfully' }, { status: 200 });
  } catch (error) {
    console.error('DELETE /api/teachers/[teacherId] error:', error);
    return NextResponse.json({ error: 'Something went wrong' }, { status: 500 });
  }
}

//TODO: implement when needed
// export async function PATCH(req: Request, { params }: { params: Promise<{ teacherId: string }> }) {}
