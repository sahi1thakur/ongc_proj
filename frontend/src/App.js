import React from 'react';
import { useNavigate, Routes, Route } from 'react-router-dom'; // Import useNavigate
import LoginForm from './components/LoginForm'; 
import Quiz from './components/Quiz';


const App = () => {
  const navigate = useNavigate(); // Call useNavigate to get the navigate function

  const handleLogin = async (username, password) => {
    try {
      // Make sure to include the full URL with the correct port number
      const response = await fetch('http://localhost:3000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok) {
        // Login successful
        console.log('Login successful:', data);
        navigate('/Quiz'); // Use navigate to redirect
        // Handle redirection or state updates as needed
        // For example, you might want to set the user state here
      } else {
        // Login failed
        console.error('Login failed:', data.message);
        // Handle error messages or state updates as needed
      }
    } catch (error) {
      // Network or other error
      console.error('Error:', error);
      // Handle error messages or state updates as needed
    }
  };

  return (
    <Routes> {/* Define your routes here */}
      <Route path="/" element={<LoginForm onLogin={handleLogin} />} />
      <Route path="/quiz" element={<Quiz />} />
    </Routes>
  );
};

export default App;
