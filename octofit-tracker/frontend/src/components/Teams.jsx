import { useEffect, useState } from 'react';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const apiEndpoint = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev/api/teams/`
    : 'http://localhost:8000/api/teams/';

  useEffect(() => {
    async function loadTeams() {
      try {
        const response = await fetch(apiEndpoint);
        if (!response.ok) {
          const body = await response.json().catch(() => ({}));
          throw new Error(body?.error || `${response.status} ${response.statusText}`);
        }
        const data = await response.json();
        setTeams(Array.isArray(data) ? data : data?.results || data?.data || data?.items || []);
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, [apiEndpoint]);

  return (
    <div className="container py-4">
      <h1>Teams</h1>
      <p>
        Fetching from <code>{apiEndpoint}</code>
        {codespaceName ? ' via Codespaces URL' : ' using localhost fallback'}.
      </p>
      {loading && <p>Loading teams...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="list-group">
          {teams.map((team) => (
            <div key={team._id || team.id || JSON.stringify(team)} className="list-group-item">
              <h5>{team.name}</h5>
              <p>Members: {Array.isArray(team.members) ? team.members.length : '—'}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Teams;
