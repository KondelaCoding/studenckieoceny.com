import { NextApiRequest, NextApiResponse } from 'next';
import { getUniversities, init } from '@/lib/db';

init();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'GET') {
    try {
      const universities = await getUniversities();
      res.status(200).json(universities);
    } catch (error) {
      console.error('Error fetching universities:', error);
      res.status(500).json({ error: 'Failed to fetch universities' });
    }
  }
}
