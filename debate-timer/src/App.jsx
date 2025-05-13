// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Dashboard from './components/Dashboard';
import DebateCreationForm from './components/DebateCreationForm';
import DebateSession from './components/DebateSession';
import DebateSummary from './components/DebateSummary';
import ProtectedRoute from './components/ProtectedRoute';

function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      {/* Protected Routes */}
      <Route
        path="/"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route
        path="/create-debate"
        element={
          <ProtectedRoute>
            <DebateCreationForm />
          </ProtectedRoute>
        }
      />
      <Route
        path="/debate/:debateId"
        element={
          <ProtectedRoute>
            <DebateSession />
          </ProtectedRoute>
        }
      />
      <Route
        path="/summary/:debateId"
        element={
          <ProtectedRoute>
            <DebateSummary />
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
