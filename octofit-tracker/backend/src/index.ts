import express from 'express';
import cors from 'cors';
import { connectDatabase } from './config/database';
import usersRouter from './routes/users';
import activitiesRouter from './routes/activities';

const app = express();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());
app.use('/api/users', usersRouter);
app.use('/api/activities', activitiesRouter);

app.get('/', (_req, res) => {
  res.json({ message: 'OctoFit Tracker API is running', baseUrl });
});

async function startServer() {
  await connectDatabase();
  app.listen(port, () => {
    console.log(`OctoFit Tracker backend listening on port ${port}`);
    console.log(`API base URL: ${baseUrl}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});

export default app;
