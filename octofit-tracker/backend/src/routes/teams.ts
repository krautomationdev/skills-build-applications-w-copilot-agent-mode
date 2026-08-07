import { Router } from 'express';
import Team from '../models/team';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const teams = await Team.find().populate('members', 'name email');
    res.json(teams);
  } catch (error) {
    console.error('Error fetching teams:', error);
    res.status(500).json({ error: 'Unable to fetch teams' });
  }
});

export default router;
