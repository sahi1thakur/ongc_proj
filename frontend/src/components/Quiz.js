import React, { useState } from 'react';

function Quiz({ username }) {
  const [selectedOption, setSelectedOption] = useState('');

  const question = {
    text: 'Question',
    options: ['opt1', 'opt2', 'opt3', 'opt4'],
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const response = await fetch('http://localhost:3000/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ question: question.text, selectedOption, username }),
      });

      if (!response.ok) {
        const error = await response.text();
        throw new Error(error);
      }

      alert('Your response has been submitted!');
    } catch (error) {
      console.error('Submission error:', error);
      alert('Failed to submit your response. Please try again.');
    }
  };

  return (
    <div>
      <h1>Quiz</h1>
      <form onSubmit={handleSubmit}>
        <p>{question.text}</p>
        {question.options.map((option) => (
          <label key={option}>
            <input
              type="radio"
              name="question"
              value={option}
              onChange={(e) => setSelectedOption(e.target.value)}
              checked={selectedOption === option}
            />
            {option}
          </label>
        ))}
        <br />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}

export default Quiz;