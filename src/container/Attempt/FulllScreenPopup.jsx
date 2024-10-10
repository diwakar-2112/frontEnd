import React from 'react';
import './fullscreenpopup.css';

function FullScreenPopup({ onClose }) {
  const openFullScreen = () => {
    const elem = document.documentElement;
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.mozRequestFullScreen) { /* Firefox */
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) { /* Chrome, Safari and Opera */
      elem.webkitRequestFullscreen();
    } else if (elem.msRequestFullscreen) { /* IE/Edge */
      elem.msRequestFullscreen();
    }
    onClose(); // Close the popup after entering full-screen mode
  };

  return (
    <div className="fullscreen-popup">
      <h1>Full Screen Mode</h1>
      <p>Click the button below to enter full-screen mode.</p>
      <button onClick={openFullScreen}>Enter Full Screen</button>
    </div>
  );
}

export default FullScreenPopup;
