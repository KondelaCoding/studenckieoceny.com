import type { User } from '../types/types';

export type Action =
  // | 'teacher:read' - Everyone should have access to read teachers, even not users not signed in
  | 'teacher:read_reported'
  | 'teacher:write'
  | 'teacher:report'
  | 'teacher:unhide'
  | 'teacher:delete'
  | 'comment:write'
  | 'comment:delete';
// | 'comment:delete_own'; - Everyone should have access to delete their own comments, this would be everywhere so we can skip it

const rolePermissions: Record<User['role'], Action[]> = {
  admin: [
    'teacher:read_reported',
    'teacher:write',
    'teacher:report',
    'teacher:unhide',
    'teacher:delete',
    'comment:write',
    'comment:delete',
  ],
  user: ['teacher:write', 'teacher:report', 'comment:write'],
};

export function hasPermission(role: User['role'] | undefined | null, action: Action): boolean {
  if (!role) return false;
  return rolePermissions[role]?.includes(action) ?? false;
}
