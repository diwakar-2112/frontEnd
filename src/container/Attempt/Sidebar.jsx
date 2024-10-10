import React from 'react';
import './sidebar.css';

function Sidebar({ data, currentQuestion, setCurrentQuestion }) {
  return (
    <div className="sidebar">
      <h2>Questions</h2>
      <ul>
        {data.map((question, index) => (
          <li key={index} className={index === currentQuestion ? 'active' : ''}>
            <button onClick={() => setCurrentQuestion(index)}>Q{index + 1}</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Sidebar;
