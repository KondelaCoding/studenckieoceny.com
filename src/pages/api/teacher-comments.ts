import { NextApiRequest, NextApiResponse } from 'next';
import { getTeacherComments, init } from '@/lib/db';

init();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const teacherId = req.query.teacherId as string;
      const teacher = await getTeacherComments(teacherId);
      res.status(200).json(teacher);
    } catch (error) {
      console.error('Error fetching comments:', error);
      res.status(500).json({ error: 'Failed to fetch comments' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
