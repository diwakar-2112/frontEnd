import React, { useRef, useState, useEffect } from 'react';
import './webcam.css';
const WebcamCapture = ({ onCapture }) => {
  const videoRef = useRef(null);
  const [mediaStream, setMediaStream] = useState(null);

  useEffect(() => {
    const enableVideoStream = async () => {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({ video: { width: 180, height: 135, frameRate: 15 } });
        setMediaStream(stream);
        videoRef.current.srcObject = stream;
      } catch (err) {
        console.error('Error accessing webcam:', err);
      }
    };

    enableVideoStream();

    return () => {
      if (mediaStream) {
        mediaStream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  const handleCapture = () => {
    const canvas = document.createElement('canvas');
    canvas.width = videoRef.current.videoWidth;
    canvas.height = videoRef.current.videoHeight;
    canvas.getContext('2d').drawImage(videoRef.current, 0, 0, canvas.width, canvas.height);
    const image = canvas.toDataURL('image/jpeg');
    onCapture(image);
  };

  return (
    <div>
      <video className='video' ref={videoRef} autoPlay muted playsInline />
      {/* <button onClick={handleCapture}>Capture</button> */}
    </div>
  );
};

export default WebcamCapture;
