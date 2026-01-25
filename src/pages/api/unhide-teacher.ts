import type { NextApiRequest, NextApiResponse } from 'next';
import { init, unhideTeacher } from '@/lib/db';

init();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { teacherId } = req.body;

    if (!teacherId) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    try {
      await unhideTeacher(teacherId);
      res.status(200).json({ message: 'Teacher unhidden successfully' });
    } catch (error) {
      console.error('Error unhiding teacher:', error);
      res.status(500).json({ message: 'Failed to unhide teacher' });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
