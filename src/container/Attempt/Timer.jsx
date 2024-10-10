// Timer.js

import React, { useState, useEffect } from 'react';

function Timer({ duration, onTimeout }) {
  const [timeLeft, setTimeLeft] = useState(duration);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (timeLeft === 0) {
        onTimeout(); // Call the onTimeout function when the timer reaches 0
      } else {
        setTimeLeft(timeLeft - 1);
      }
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, onTimeout]);

  return <div>{formatTime(timeLeft)}</div>;
}

function formatTime(seconds) {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;
  return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

export default Timer;
