import { Router } from 'express';
import LeaderboardEntry from '../models/leaderboard';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const entries = await LeaderboardEntry.find().populate('user', 'name email');
    res.json(entries);
  } catch (error) {
    console.error('Error fetching leaderboard:', error);
    res.status(500).json({ error: 'Unable to fetch leaderboard' });
  }
});

export default router;
