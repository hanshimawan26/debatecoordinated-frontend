// src/components/Stopwatch.jsx
import React, { useState, useEffect, useRef, useMemo } from "react";
import gavelSound from "../assets/gavel.mp3";
import beepSound from "../assets/beep.mp3";

const Stopwatch = ({ speakerKey, onSave }) => {
  // Determine mode based on speakerKey ("REPLY" means reply mode)
  const isReply = speakerKey.includes("REPLY");
  const { knock1, knock2, knock3, end } = useMemo(() => {
    return isReply
      ? { knock1: 60, knock2: 180, knock3: 240, end: 260 }
      : { knock1: 60, knock2: 340, knock3: 420, end: 440 };
  }, [isReply]);

  // Local state variables
  const [time, setTime] = useState(0); // seconds elapsed
  const [isRunning, setIsRunning] = useState(false);
  const [countdown, setCountdown] = useState(null); // for the 3-second countdown
  // Button state: "initial", "running", "stopped", "saved"
  const [buttonState, setButtonState] = useState("initial");

  const intervalRef = useRef(null);
  const countdownRef = useRef(null);

  // Sound functions (play gavel & beep)
  const playGavel = (repeat = false) => {
    const audio = new Audio(gavelSound);
    audio.play();
    if (repeat) {
      for (let i = 0; i < 8; i++) {
        setTimeout(() => {
          audio.currentTime = 0;
          audio.play();
        }, i * 800);
      }
    }
  };

  const playBeep = () => {
    const audio = new Audio(beepSound);
    audio.play();
  };

  // Format seconds into mm:ss
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? "0" : ""}${s}`;
  };

  // Countdown effect: when countdown is active, update it every second.
  useEffect(() => {
    if (countdown !== null) {
      if (countdown > 0) {
        playBeep();
        countdownRef.current = setTimeout(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
      } else {
        setCountdown(null);
        playGavel();
        setIsRunning(true);
      }
    }
    return () => clearTimeout(countdownRef.current);
  }, [countdown]);

  // Timer effect: when running, update time every second and check thresholds.
  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => {
          const newTime = prevTime + 1;
          if (newTime === knock1) {
            playGavel();
          } else if (newTime === knock2) {
            playGavel();
          } else if (newTime === knock3) {
            playGavel();
            setTimeout(() => playGavel(), 800);
          } else if (newTime === end) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            playGavel(true);
            return end;
          }
          return newTime;
        });
      }, 1000);
    }
    return () => clearInterval(intervalRef.current);
  }, [isRunning, knock1, knock2, knock3, end]);

  // Button handlers
  const handleStart = () => {
    setButtonState("running");
    setCountdown(3); // start 3-second countdown
  };

  const handleStop = () => {
    if (isRunning) {
      clearInterval(intervalRef.current);
      setIsRunning(false);
      setButtonState("stopped");
    }
  };

  const handlePlay = () => {
    setButtonState("running");
    setIsRunning(true);
  };

  const handleReset = () => {
    clearInterval(intervalRef.current);
    setIsRunning(false);
    setTime(0);
    setCountdown(null);
    setButtonState("initial");
  };

  const handleSave = () => {
    if (onSave) onSave(speakerKey, time);
    setButtonState("saved");
  };

  return (
    <div style={{ border: "1px solid #ccc", padding: "10px", margin: "10px" }}>
      <h3>{speakerKey}</h3>
      <div style={{ fontSize: "48px" }}>
        {countdown !== null ? countdown : formatTime(time)}
      </div>
      <div>
        {buttonState === "initial" && (
          <>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleSave}>Save</button>
          </>
        )}
        {buttonState === "running" && (
          <>
            <button onClick={handleStop}>Stop</button>
          </>
        )}
        {buttonState === "stopped" && (
          <>
            <button onClick={handlePlay}>Play</button>
            <button onClick={handleReset}>Reset</button>
            <button onClick={handleSave}>Save</button>
          </>
        )}
        {buttonState === "saved" && (
          <>
            <button onClick={handleStart}>Start</button>
            <button onClick={handleReset}>Reset</button>
          </>
        )}
      </div>
      <div>
        <h4>Saved Time:</h4>
        <ul>
          <li>{formatTime(time)}</li>
        </ul>
      </div>
    </div>
  );
};

export default Stopwatch;
