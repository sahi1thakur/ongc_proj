import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Quiz from '../components/Quiz';
import LoginForm from '../components/LoginForm';

const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginForm />} />
        <Route path="/quiz" element={<Quiz />} />
        
      </Routes>
    </Router>
  );
};

export default AppRoutes;
