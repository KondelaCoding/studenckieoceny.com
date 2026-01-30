import { NextApiRequest, NextApiResponse } from 'next';
import { getTeacherById, init } from '@/lib/db';

init();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const id = req.query.id as string;
      const teacher = await getTeacherById(id);
      res.status(200).json(teacher);
    } catch (error) {
      console.error('Error fetching teacher:', error);
      res.status(500).json({ error: 'Failed to fetch teacher' });
    }
  } else {
    res.setHeader('Allow', ['GET']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
