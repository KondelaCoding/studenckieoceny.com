export type TeacherProps = {
  id: string;
  name: string;
  totalRatingValue: number;
  numberOfVotes: number;
  subjects: string;
  timestamp: number;
  comments?: Comment[];
  primaryUniversityId: University['id'];
  secondaryUniversityId: University['id'] | null;
  reason?: string | null;
};

export type Comment = {
  id: string;
  teacherId: string;
  user: string;
  comment: string;
  timestamp: number;
  likes: number;
};

export type University = {
  id: string;
  name: string;
};

export type Subject = {
  id: string;
  name: string;
};

export const Months = {
  1: 'Stycznia',
  2: 'Lutego',
  3: 'Marca',
  4: 'Kwietnia',
  5: 'Maja',
  6: 'Czerwca',
  7: 'Lipca',
  8: 'Sierpnia',
  9: 'Września',
  10: 'Października',
  11: 'Listopada',
  12: 'Grudnia 🎅',
};

export type User = {
  id: string;
  name: string;
  email: string;
  password: string | null;
  role: 'user' | 'admin';
  createdAt: Date;
  updatedAt: Date;
};
