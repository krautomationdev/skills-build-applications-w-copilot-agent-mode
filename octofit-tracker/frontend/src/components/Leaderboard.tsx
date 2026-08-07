import { useEffect, useState } from 'react';

function Leaderboard() {
  const [entries, setEntries] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const apiEndpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/leaderboard/`
    : 'http://localhost:8000/api/leaderboard/';

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          throw new Error(body?.error || `${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setEntries(Array.isArray(data) ? data : data?.results || data?.data || data?.items || []);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, [apiEndpoint]);

  return (
    <div className="container py-4">
      <h1>Leaderboard</h1>
      <p>
        Fetching from <code>{apiEndpoint}</code>
        {codespaceName ? ' via Codespaces URL' : ' using localhost fallback'}.
      </p>
      {loading && <p>Loading leaderboard...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-hover">
            <thead>
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Score</th>
                <th>Updated</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((entry) => (
                <tr key={entry._id || entry.id || JSON.stringify(entry)}>
                  <td>{entry.rank}</td>
                  <td>{entry.user?.name ?? entry.user?.email ?? 'Unknown'}</td>
                  <td>{entry.score}</td>
                  <td>{new Date(entry.updatedAt || entry.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Leaderboard;
