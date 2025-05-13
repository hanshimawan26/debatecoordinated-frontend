// src/components/Dashboard.jsx
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [debates, setDebates] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    fetch('/api/debates', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => setDebates(data.debates))
      .catch(err => console.error(err));
  }, []);

  const handleLogout = async () => {
    localStorage.removeItem('access_token');
    navigate('/login');
  };

  return (
    <div>
      <h2>Dashboard</h2>
      <button onClick={() => navigate('/create-debate')}>Create New Debate</button>
      <button onClick={handleLogout}>Logout</button>
      <h3>Your Debates</h3>
      <ul>
        {debates.map(debate => (
          <li key={debate._id}>
            <Link to={`/summary/${debate._id}`}>{debate.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
