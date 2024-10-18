/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from "react";
import { useState, useRef, useCallback } from "react";
import Grid from "@mui/material/Grid";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";
import { useLongPress } from "use-long-press";

interface ButtonUsageProps {
  style: React.CSSProperties; // Definindo o tipo para CSSProperties
}

const ButtonUsage: React.FC<ButtonUsageProps> = ({ style }) => {
  const [progress, setProgress] = useState(0);
  const [enabled] = useState(true);
  const progressBarContainerRef = useRef<HTMLDivElement>(null);
  const holdTime = 3000; // 3 seconds
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout | null>(null);
  const [isActive, setIsActive] = useState<boolean>(false);
  const startTimeRef = useRef<number>(0);

  const callback = useCallback(() => {
    sendGetRequest();
    setIsActive(false);
  }, []);

  const bind = useLongPress(enabled ? callback : null, {
    onStart: () => {
      startTimeRef.current = Date.now();
      const id = setInterval(updateProgressBar, 10); // Update every 10ms
      setIsActive(true);
      setIntervalId(id);
    },
    onFinish: () => {
      if (intervalId) clearInterval(intervalId);
      setProgress(0);
      setIsActive(false);
    },
    onCancel: () => {
      if (intervalId) clearInterval(intervalId);
      setProgress(0);
      setIsActive(false);
    },
    threshold: holdTime,
    cancelOnMovement: 500,
  });

  const handleContextMenu = (event: React.MouseEvent) => {
    event.preventDefault();
  };

  const updateProgressBar = () => {
    const elapsedTime = Date.now() - startTimeRef.current;
    const progressValue = Math.min((elapsedTime / holdTime) * 100, 100);
    setProgress(progressValue);
  };

  const sendGetRequest = async () => {
    console.log(import.meta.env.VITE_API_URL)
    const apiUrl = import.meta.env.VITE_API_URL
      ? import.meta.env.VITE_API_URL
      : "https://httpbin.org/get";

    try {
      const response = await axios.get(apiUrl);
      if (response.status === 200) {
        toast.success("Sucesso!");
      } else {
        toast.error("Erro.");
      }
    } catch (error) {
      toast.error("Erro ao enviar requisição.");
    }
  };

  return (
    <main id="app" style={style}>
      <Grid item style={{ display: "grid" }}>
        <label style={{ color: "white" }}>
          Para abrir, mantenha pressionado por 3 segundos.
        </label>
        <button className={isActive ? 'active' : ''} style={{ marginTop: "25px" }} onContextMenu={handleContextMenu} {...bind()}>
          <span className="text">Abrir Portão</span>
          <span className="shimmer"></span>
        </button>
        <div
          id="progressBarContainer"
          ref={progressBarContainerRef}
          style={{
            display: progress > 0 ? "block" : "none",
            width: "100%",
            backgroundColor: "#e0e0e0",
            height: "30px",
            marginTop: "10px",
          }}
        >
          <div
            id="progressBar"
            style={{
              width: `${progress}%`,
              height: "100%",
              backgroundColor: "#76c7c0",
            }}
          ></div>
        </div>
      </Grid>
      <ToastContainer />
    </main>
  );
};

export default ButtonUsage;
