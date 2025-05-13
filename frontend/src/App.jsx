import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Signup from './Components/Signup';
import Login from './Components/Login';
import Todos from './Components/Todos';
import Profile from './Components/Profile';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  // Optional: Listen for storage changes from other tabs/windows
  useEffect(() => {
    const handleStorageChange = () => {
      setToken(localStorage.getItem('token'));
    };
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  return (
    <Routes>
      <Route path="/signup" element={<Signup />} />
      <Route path="/login" element={<Login setToken={setToken} />} />
      <Route
        path="/todos"
        element={token ? <Todos /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/profile"
        element={token ? <Profile /> : <Navigate to="/login" replace />}
      />
      <Route
        path="/*"
        element={<Navigate to={token ? '/todos' : '/login'} replace />}
      />
    </Routes>
  );
}

export default App;
