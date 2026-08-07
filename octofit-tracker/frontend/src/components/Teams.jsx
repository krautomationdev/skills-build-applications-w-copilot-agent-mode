import { useEffect, useState } from 'react';
import { fetchApi } from '../api';

function Teams() {
  const [teams, setTeams] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const resolvedApiHost = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  useEffect(() => {
    async function loadTeams() {
      try {
        const data = await fetchApi('teams');
        setTeams(Array.isArray(data) ? data : data?.results || data?.data || data?.items || []);
      } catch (err) {
        setError(err.message || 'Unable to load teams');
      } finally {
        setLoading(false);
      }
    }

    loadTeams();
  }, []);

  return (
    <div className="container py-4">
      <h1>Teams</h1>
      <p>
        Fetching from <code>{`${resolvedApiHost}/api/teams`}</code>
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
