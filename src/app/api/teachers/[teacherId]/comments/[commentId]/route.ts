// PATCH- Edit a comment (owner or admin)
// DELETE- Delete a comment (owner or admin)

import type { NextApiRequest, NextApiResponse } from 'next';
export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Implementation here
  console.log('Admin notified about adding a teacher.');
  res.status(200).json({ message: 'Admin notified about adding a teacher.' });
}
