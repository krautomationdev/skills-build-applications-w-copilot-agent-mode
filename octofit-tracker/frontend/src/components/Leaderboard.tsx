import { useEffect, useState } from 'react';
import { fetchApi, apiHost, useCodespaceUrl } from '../api';

function Leaderboard() {
  const [entries, setEntries] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadLeaderboard() {
      try {
        const data = await fetchApi('leaderboard');
        setEntries(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadLeaderboard();
  }, []);

  return (
    <div className="container py-4">
      <h1>Leaderboard</h1>
      <p>
        Fetching from <code>{`${apiHost}/leaderboard`}</code>
        {useCodespaceUrl ? ' via Codespaces URL' : ' using localhost fallback'}.
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
