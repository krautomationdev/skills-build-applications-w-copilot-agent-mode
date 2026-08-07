import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database';
import usersRouter from './routes/users';
import activitiesRouter from './routes/activities';
import teamsRouter from './routes/teams';
import leaderboardRouter from './routes/leaderboard';
import workoutsRouter from './routes/workouts';

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/activities', activitiesRouter);
app.use('/api/teams', teamsRouter);
app.use('/api/leaderboard', leaderboardRouter);
app.use('/api/workouts', workoutsRouter);

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API is running' });
});

export async function initializeApp() {
  await connectDatabase();
}

export default app;
