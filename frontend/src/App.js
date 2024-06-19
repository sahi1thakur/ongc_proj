import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';
import LoginForm from './components/LoginForm';
import Home from './components/Home';
import Quiz from './components/Quiz';

function App() {
  const [user, setUser] = useState(null);

  const handleLogin = async (username, password) => {
    try {
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data.user);
        return data.user;
      } else {
        const error = await response.json();
        console.error('Login error:', error.message);
        return null;
      }
    } catch (error) {
      console.error('Network error:', error);
      return null;
    }
  };

  return (
    <div>
      {user ? (
        <Routes>
          <Route path="/quiz" element={<Quiz username={user.username} />} />
          <Route path="/" element={<Home user={user} />} />
        </Routes>
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
