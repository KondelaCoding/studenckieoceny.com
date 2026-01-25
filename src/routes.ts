export const publicRoutes = [
  '/',
  '/search',
  /^\/profil\/\d+$/, // Allow /profil/:id where :id is a number
  '/regulamin',
  '/polityka-prywatnosci',
];

// routes used for authentication
export const authRoutes = ['/login', '/rejestracja'];

export const apiAuthPrefix = '/api/auth';

export const apiPrefix = '/api';

export const DEFAULT_LOGIN_REDIRECT = '/';
