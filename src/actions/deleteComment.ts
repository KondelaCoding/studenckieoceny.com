'use server';

import { prisma } from '@/lib/prisma';
import { auth } from '@/auth';
import { hasPermission } from '@/lib/permissions';
import { getRoleName } from '@/lib/utils';

export async function deleteCommentAction(id: string) {
  const session = await auth();
  const role = getRoleName(session);

  if (!hasPermission(role, 'comment:delete')) {
    throw new Error('Unauthorized');
  }

  await prisma.comment.delete({
    where: { id },
  });

  return { success: true };
}
