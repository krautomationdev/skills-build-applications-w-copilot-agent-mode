import { Router } from 'express';
import Activity from '../models/activity';

const router = Router();

router.get('/', async (_req, res) => {
  try {
    const activities = await Activity.find().populate('user', 'name email');
    res.json(activities);
  } catch (error) {
    console.error('Error fetching activities:', error);
    res.status(500).json({ error: 'Unable to fetch activities' });
  }
});

export default router;
