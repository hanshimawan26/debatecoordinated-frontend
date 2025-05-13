// src/components/DebateSession.jsx
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import Stopwatch from './Stopwatch';

function DebateSession() {
  const { debateId } = useParams();
  const navigate = useNavigate();

  const handleSaveTime = async (speakerKey, time) => {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`/api/debate/${debateId}/save_time`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ speaker_key: speakerKey, time: time }),
    });
    if (!response.ok) {
      alert(`Failed to save time for ${speakerKey}`);
    }
  };

  const handleEndDebate = async () => {
    const token = localStorage.getItem('access_token');
    const response = await fetch(`/api/debate/${debateId}/end`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });
    if(response.ok) {
      navigate(`/summary/${debateId}`);
    } else {
      alert("Failed to end debate");
    }
  };

  return (
    <div>
      <h2>Debate Session</h2>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        overflowY: 'scroll',
        maxHeight: '80vh'
      }}>
         <Stopwatch speakerKey="GOV1" onSave={handleSaveTime} />
         <Stopwatch speakerKey="OPP1" onSave={handleSaveTime} />
         <Stopwatch speakerKey="GOV2" onSave={handleSaveTime} />
         <Stopwatch speakerKey="OPP2" onSave={handleSaveTime} />
         <Stopwatch speakerKey="GOV3" onSave={handleSaveTime} />
         <Stopwatch speakerKey="OPP3" onSave={handleSaveTime} />
         <Stopwatch speakerKey="OPP REPLY" onSave={handleSaveTime} />
         <Stopwatch speakerKey="GOV REPLY" onSave={handleSaveTime} />
      </div>
      <button onClick={handleEndDebate}>End Debate</button>
    </div>
  );
}

export default DebateSession;
