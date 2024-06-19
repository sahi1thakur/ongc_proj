import React from 'react';
import { useNavigate } from 'react-router-dom';

const Home = ({ user }) => {
  const navigate = useNavigate();

  const handleQuizClick = () => {
    navigate('/quiz');
  };

  return (
    <div>
      <h1>Welcome, {user.username}</h1>
      {user.region === 'mumbai' ? (
        <button onClick={handleQuizClick}>Take the Quiz</button>
      ) : (
        <p>Hello, welcome!</p>
      )}
    </div>
  );
};

export default Home;
