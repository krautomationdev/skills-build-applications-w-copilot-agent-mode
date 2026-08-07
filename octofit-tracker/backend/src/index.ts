import express from 'express';
import cors from 'cors';
import db from './config/database';
import usersRouter from './routes/users';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API is running' });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker backend listening on port ${port}`);
});

export default app;
