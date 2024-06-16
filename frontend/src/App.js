
import React, { useState } from 'react';
import LoginForm from './components/LoginForm';
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
        const error = await response.text();
        console.error('Login error:', error);
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
        <Quiz username={user.username} />
      ) : (
        <LoginForm onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;