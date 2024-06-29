/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import { useState, useRef, useCallback } from 'react';
import Grid from '@mui/material/Grid';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios, { AxiosRequestConfig, RawAxiosRequestHeaders } from 'axios';
import { useLongPress } from 'use-long-press';

interface ButtonUsageProps {
  style: React.CSSProperties; // Definindo o tipo para CSSProperties
}

const ButtonUsage: React.FC<ButtonUsageProps> = ({ style }) => {
  const [progress, setProgress] = useState(0);
  const [enabled] = useState(true);
  const progressBarContainerRef = useRef<HTMLDivElement>(null);
  const holdTime = 3000; // 3 seconds
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const startTimeRef = useRef<number>(0);

  const callback = useCallback(() => {
    sendGetRequest();
  }, []);

  const bind = useLongPress(enabled ? callback : null, {
    onStart: () => {
      startTimeRef.current = Date.now();
      const id = setInterval(updateProgressBar, 50); // Update every 50ms
      setIntervalId(id);
    },
    onFinish: () => {
      if (intervalId) clearInterval(intervalId);
      setProgress(0);
    },
    onCancel: () => {
      if (intervalId) clearInterval(intervalId);
      setProgress(0);
    },
    threshold: holdTime,
  });

  const updateProgressBar = () => {
    const elapsedTime = Date.now() - startTimeRef.current;
    const progressValue = Math.min((elapsedTime / holdTime) * 100, 100);
    setProgress(progressValue);
  };

  const sendGetRequest = async () => {
    const apiUrl = import.meta.env.REACT_APP_API_URL || 'https://httpbin.org/get';

    const config: AxiosRequestConfig = {
      headers: {
        'Accept': 'application/json',
      } as RawAxiosRequestHeaders,
    };

    try {
      const response = await axios.get(apiUrl, config);
      if (response.status === 200) {
        toast.success('Sucesso!');
      } else {
        toast.error('Erro.');
      }
    } catch (error) {
      toast.error('Erro ao enviar requisição.');
    }
  };

  return (
    <main id="app" style={style}>
      <Grid item>
        <button {...bind()}>
          <span className="text">Abrir Portão</span>
          <span className="shimmer"></span>
        </button>
        <div id="progressBarContainer" ref={progressBarContainerRef} style={{ display: progress > 0 ? 'block' : 'none', width: '100%', backgroundColor: '#e0e0e0', height: '30px', marginTop: '10px' }}>
          <div id="progressBar" style={{ width: `${progress}%`, height: '100%', backgroundColor: '#76c7c0' }}></div>
        </div>
      </Grid>
      <ToastContainer />
    </main>
  );
}

export default ButtonUsage;
