import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { Login } from '@/pages/Login';
import { Dashboard } from '@/pages/Dashboard';
import { LoadingSpinner } from '@/components/ui/LoadingSpinner';
import '@/styles/globals.css';
import '@/styles/animations.css';

function App() {
  const { user, loading } = useAuth();

  // Show loading spinner while checking authentication
  if (loading) {
    return (
      <div className="app-loading">
        <LoadingSpinner 
          size="large" 
          text="Initializing AnimeNox..." 
        />
      </div>
    );
  }

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route 
            path="/login" 
            element={!user ? <Login /> : <Navigate to="/" replace />} 
          />
          <Route 
            path="/" 
            element={user ? <Dashboard /> : <Navigate to="/login" replace />} 
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
