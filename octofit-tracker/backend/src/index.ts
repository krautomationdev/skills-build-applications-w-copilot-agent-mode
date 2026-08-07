import express from 'express';
import cors from 'cors';
import db from './config/database';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;

app.use(cors());
app.use(express.json());

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API is running' });
});

app.listen(port, () => {
  console.log(`OctoFit Tracker backend listening on port ${port}`);
});

export default app;
