// src/components/DebateSummary.jsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function DebateSummary() {
  const { debateId } = useParams();
  const [debate, setDebate] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    fetch(`/api/debate/${debateId}`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => res.json())
      .then(data => setDebate(data.debate))
      .catch(err => console.error(err));
  }, [debateId]);

  if(!debate) return <div>Loading...</div>;

  return (
    <div>
      <h2>Debate Summary</h2>
      <h3>{debate.title}</h3>
      <p>Date: {new Date(debate.date).toLocaleString()}</p>
      <p>Motion: {debate.motion}</p>
      <h4>Speakers and Times:</h4>
      <div>
        <h5>Government:</h5>
        <ul>
          {Object.entries(debate.teams.government).map(([key, speaker]) => (
            <li key={key}>{key}: {speaker.name} - {speaker.time ? speaker.time : "Not saved"}</li>
          ))}
        </ul>
      </div>
      <div>
        <h5>Opposition:</h5>
        <ul>
          {Object.entries(debate.teams.opposition).map(([key, speaker]) => (
            <li key={key}>{key}: {speaker.name} - {speaker.time ? speaker.time : "Not saved"}</li>
          ))}
        </ul>
      </div>
      <Link to="/">Back to Dashboard</Link>
    </div>
  );
}

export default DebateSummary;
