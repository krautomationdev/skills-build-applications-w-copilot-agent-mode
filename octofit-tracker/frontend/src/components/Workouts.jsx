import { useEffect, useState } from 'react';
import { fetchApi } from '../api';

function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const codespaceName = import.meta.env.VITE_CODESPACE_NAME?.trim();
  const resolvedApiHost = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const data = await fetchApi('workouts');
        setWorkouts(Array.isArray(data) ? data : data?.results || data?.data || data?.items || []);
      } catch (err) {
        setError(err.message || 'Unable to load workouts');
      } finally {
        setLoading(false);
      }
    }

    loadWorkouts();
  }, []);

  return (
    <div className="container py-4">
      <h1>Workouts</h1>
      <p>
        Fetching from <code>{`${resolvedApiHost}/api/workouts`}</code>
        {codespaceName ? ' via Codespaces URL' : ' using localhost fallback'}.
      </p>
      {loading && <p>Loading workouts...</p>}
      {error && <div className="alert alert-danger">{error}</div>}
      {!loading && !error && (
        <div className="row gy-3">
          {workouts.map((workout) => (
            <div key={workout._id || workout.id || JSON.stringify(workout)} className="col-12 col-md-6">
              <div className="card h-100">
                <div className="card-body">
                  <h5 className="card-title">{workout.name}</h5>
                  <p className="card-text">{workout.description}</p>
                  <p className="mb-1">Difficulty: {workout.difficulty}</p>
                  <p className="mb-0">Duration: {workout.durationMinutes ?? workout.duration} minutes</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Workouts;
