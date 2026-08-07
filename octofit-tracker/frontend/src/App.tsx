import { Route, Routes, Link } from 'react-router-dom';

function Home() {
  return (
    <div className="container py-4">
      <h1>OctoFit Tracker</h1>
      <p>Modern frontend for the OctoFit Tracker multi-tier app.</p>
      <p>Use the backend at <code>http://localhost:8000</code> and MongoDB on <code>mongodb://localhost:27017</code>.</p>
    </div>
  );
}

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">OctoFit Tracker</Link>
        </div>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
