import { useEffect, useState } from 'react';
import { fetchApi, apiHost, useCodespaceUrl } from '../api';

function Workouts() {
  const [workouts, setWorkouts] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadWorkouts() {
      try {
        const data = await fetchApi('workouts');
        setWorkouts(data);
      } catch (err: any) {
        setError(err.message);
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
        Fetching from <code>{`${apiHost}/workouts`}</code>
        {useCodespaceUrl ? ' via Codespaces URL' : ' using localhost fallback'}.
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
