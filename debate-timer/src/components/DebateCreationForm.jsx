// src/components/DebateCreationForm.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function DebateCreationForm() {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [motion, setMotion] = useState('');
  const [gov, setGov] = useState({ GOV1: '', GOV2: '', GOV3: '', 'GOV REPLY': '' });
  const [opp, setOpp] = useState({ OPP1: '', OPP2: '', OPP3: '', 'OPP REPLY': '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const debateData = {
      title,
      motion,
      format: "Asian Parliamentary",
      mode: "",  // currently empty
      teams: {
        government: {
          "GOV1": { name: gov.GOV1 },
          "GOV2": { name: gov.GOV2 },
          "GOV3": { name: gov.GOV3 },
          "GOV REPLY": { name: gov["GOV REPLY"] }
        },
        opposition: {
          "OPP1": { name: opp.OPP1 },
          "OPP2": { name: opp.OPP2 },
          "OPP3": { name: opp.OPP3 },
          "OPP REPLY": { name: opp["OPP REPLY"] }
        }
      }
    };
  
    const token = localStorage.getItem('access_token');
    const response = await fetch('/api/debate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(debateData),
    });
    const data = await response.json();
    if(response.ok) {
      navigate(`/debate/${data.debate._id}`);
    } else {
      alert('Error creating debate');
    }
  };  

  const handleGovChange = (e) => {
    setGov({...gov, [e.target.name]: e.target.value});
  };

  const handleOppChange = (e) => {
    setOpp({...opp, [e.target.name]: e.target.value});
  };

  return (
    <div>
      <h2>Create Debate</h2>
      <form onSubmit={handleSubmit}>
         <div>
           <label>Title (optional):</label>
           <input type="text" value={title} onChange={e => setTitle(e.target.value)} placeholder="Debate title"/>
         </div>
         <div>
           <label>Motion:</label>
           <input type="text" value={motion} onChange={e => setMotion(e.target.value)} required/>
         </div>
         <div>
           <h3>Government Team</h3>
           <div>
             <label>GOV1:</label>
             <input type="text" name="GOV1" value={gov.GOV1} onChange={handleGovChange} required/>
           </div>
           <div>
             <label>GOV2:</label>
             <input type="text" name="GOV2" value={gov.GOV2} onChange={handleGovChange} required/>
           </div>
           <div>
             <label>GOV3:</label>
             <input type="text" name="GOV3" value={gov.GOV3} onChange={handleGovChange} required/>
           </div>
           <div>
             <label>GOV REPLY:</label>
             <input type="text" name="GOV REPLY" value={gov['GOV REPLY']} onChange={handleGovChange} required/>
           </div>
         </div>
         <div>
           <h3>Opposition Team</h3>
           <div>
             <label>OPP1:</label>
             <input type="text" name="OPP1" value={opp.OPP1} onChange={handleOppChange} required/>
           </div>
           <div>
             <label>OPP2:</label>
             <input type="text" name="OPP2" value={opp.OPP2} onChange={handleOppChange} required/>
           </div>
           <div>
             <label>OPP3:</label>
             <input type="text" name="OPP3" value={opp.OPP3} onChange={handleOppChange} required/>
           </div>
           <div>
             <label>OPP REPLY:</label>
             <input type="text" name="OPP REPLY" value={opp['OPP REPLY']} onChange={handleOppChange} required/>
           </div>
         </div>
         <button type="submit">Create Debate</button>
      </form>
    </div>
  );
}

export default DebateCreationForm;
