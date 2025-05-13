// src/components/Register.jsx
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

function Register() {
  const [email, setEmail]           = useState('');
  const [username, setUsername]     = useState('');
  const [name, setName]             = useState('');
  const [institution, setInstitution] = useState('');
  const [password, setPassword]     = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({ email, username, name, password, institution }),
    });
    if (response.ok) {
      navigate('/login');
    } else {
      alert('Registration failed');
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <form onSubmit={handleSubmit}>
         <input type="email" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required/>
         <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} required/>
         <input type="text" placeholder="Name" value={name} onChange={e => setName(e.target.value)} required/>
         <input type="text" placeholder="Institution" value={institution} onChange={e => setInstitution(e.target.value)} required/>
         <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required/>
         <button type="submit">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
    </div>
  );
}
export default Register;
