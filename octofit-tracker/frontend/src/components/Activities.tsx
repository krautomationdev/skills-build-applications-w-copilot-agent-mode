import { useEffect, useState } from 'react';
import { fetchApi, apiHost, useCodespaceUrl } from '../api';

function Activities() {
  const [activities, setActivities] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const resolvedApiHost = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  useEffect(() => {
    async function loadActivities() {
      try {
        const data = await fetchApi('activities');
        setActivities(data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    loadActivities();
  }, []);

  return (
    <div className="container py-4">
      <h1>Activities</h1>
      <p>
        Fetching from <code>{`${resolvedApiHost}/api/activities/`}</code>
        {codespaceName ? ' via Codespaces URL' : ' using localhost fallback'}.
      </p>
      {loading && <p>Loading activities...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="table-responsive">
          <table className="table table-striped">
            <thead>
              <tr>
                <th>User</th>
                <th>Activity</th>
                <th>Duration</th>
                <th>Calories</th>
                <th>When</th>
              </tr>
            </thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.id || JSON.stringify(activity)}>
                  <td>{activity.user?.name ?? activity.user?.email ?? 'Unknown'}</td>
                  <td>{activity.type}</td>
                  <td>{activity.durationMinutes ?? activity.duration ?? '—'}</td>
                  <td>{activity.calories ?? '—'}</td>
                  <td>{new Date(activity.performedAt || activity.createdAt).toLocaleString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default Activities;
