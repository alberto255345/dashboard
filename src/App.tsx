import * as React from 'react';
import { useState, useRef } from 'react';
import Grid from '@mui/material/Grid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';

interface ButtonUsageProps {
  style: React.CSSProperties; // Definindo o tipo para CSSProperties
}

const ButtonUsage: React.FC<ButtonUsageProps> = ({ style }) => {
  const [progress, setProgress] = useState(0);
  const progressBarContainerRef = useRef<HTMLDivElement>(null);
  const holdTime = 3000; // 3 seconds
  let timer: ReturnType<typeof setTimeout>;
  let interval: ReturnType<typeof setInterval>;
  let startTime: number;

  const startTimer = (event: React.MouseEvent | React.TouchEvent) => {
    event.preventDefault();
    startTime = Date.now();
    setProgress(0);
    if (progressBarContainerRef.current) {
      progressBarContainerRef.current.style.display = 'block';
    }

    timer = setTimeout(() => {
      sendGetRequest();
      if (progressBarContainerRef.current) {
        progressBarContainerRef.current.style.display = 'none';
      }
      setProgress(0); // Reset progress to 0 after request is sent
    }, holdTime);

    interval = setInterval(updateProgressBar, 50); // Update every 50ms
  };

  const cancelTimer = () => {
    clearTimeout(timer);
    clearInterval(interval);
    setProgress(0);
    if (progressBarContainerRef.current) {
      progressBarContainerRef.current.style.display = 'none';
    }
  };

  const updateProgressBar = () => {
    const elapsedTime = Date.now() - startTime;
    const progressValue = Math.min((elapsedTime / holdTime) * 100, 100);
    setProgress(progressValue);
  };

  const sendGetRequest = () => {
    const apiUrl = import.meta.env.REACT_APP_API_URL || 'https://example.com/default-url';
    axios.get(apiUrl, {
      headers: {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*', // Adicione este header
      }
    })
    .then(response => {
      console.log('Success:', response.data);
      toast.success('Get request successful!');
    })
    .catch((error) => {
      console.error('Error:', error);
      toast.error('Get request failed.');
    });
  };

  return (
    <main id="app" style={style}>
      <Grid item>
        <button
          onMouseDown={startTimer}
          onTouchStart={startTimer}
          onMouseUp={cancelTimer}
          onMouseLeave={cancelTimer}
          onTouchEnd={cancelTimer}
          onTouchCancel={cancelTimer}
        >
          <span className="text">Abrir Portão</span>
          <span className="shimmer"></span>
        </button>
        <div id="progressBarContainer" ref={progressBarContainerRef} style={{ display: 'none', width: '100%', backgroundColor: '#e0e0e0', height: '30px', marginTop: '10px' }}>
          <div id="progressBar" style={{ width: `${progress}%`, height: '100%', backgroundColor: '#76c7c0' }}></div>
        </div>
      </Grid>
      <ToastContainer />
    </main>
  );
}

export default ButtonUsage;
