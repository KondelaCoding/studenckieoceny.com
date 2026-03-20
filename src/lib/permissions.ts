import type { User } from '../types/types';

export type Action =
  // | 'teacher:read' - Everyone should have access to read teachers, even not users not signed in
  | 'teacher:read_reported'
  | 'teacher:write'
  | 'teacher:report'
  | 'teacher:unhide'
  | 'teacher:delete'
  | 'comment:write'
  | 'comment:delete'
  | 'comment:delete_own';

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
  user: ['teacher:write', 'teacher:report', 'comment:write', 'comment:delete_own'],
};

export function hasPermission(role: User['role'] | undefined | null, action: Action): boolean {
  if (!role) return false;
  return rolePermissions[role]?.includes(action) ?? false;
}
