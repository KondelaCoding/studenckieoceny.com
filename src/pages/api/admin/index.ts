import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log('Handler invoked');
  //   console.log(req, res);
  res.status(200).json({ message: 'Comment added successfully' });
}
