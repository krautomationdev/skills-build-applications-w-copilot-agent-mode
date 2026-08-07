import app, { initializeApp } from './index';

const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

async function startServer() {
  await initializeApp();
  app.listen(port, () => {
    console.log(`OctoFit Tracker backend listening on port ${port}`);
    console.log(`API base URL: ${baseUrl}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});
